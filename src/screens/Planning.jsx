import { View, Text, SafeAreaView, Platform, StatusBar, Dimensions, Pressable, Keyboard, useWindowDimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import BlueButton from '../components/buttons/BlueButton';
import Divider from '../components/cards/card/Divider';
import InputTimeField from '../components/cards/planning/InputTimeField';
import InputDurationField from '../components/cards/planning/InputDurationField';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import AbsoluteTextButton from '../components/buttons/AbsoluteTextButton';
import TaskIsland from '../components/cards/planning/TaskIsland';
import InputField from '../components/cards/planning/InputField';

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackButtonHandler from '../scripts/assistive/BackButtonHandler';
import PlanningManager from '../scripts/managers/PlanningManager';
import { observer } from 'mobx-react-lite';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const Planning = observer(({ route }) => {
    const navigation = useNavigation();
    const windowHeight = useWindowDimensions().height;

    const isTommorow = route.params[0];

    useEffect(() => {
        PlanningManager.setIsTomorrow(isTommorow);

        navigation.addListener('blur', () => {
            //NotificationsPlanner.planTaskNotifications(PlanningManager.tasksList, 120); // Notifications for planned tasks
            PlanningManager.saveTasksList();
            PlanningManager.resetTempValues();
        });
    }, []);

    useEffect(() => { //Subscribe on ABB               
        navigation.addListener('focus', () => {
            BackButtonHandler.handleAndroidBackButton(() => {
                if(Keyboard.isVisible() === false)
                    navigation.goBack();
                else
                    Keyboard.dismiss();
            })
        })

        navigation.addListener('blur', BackButtonHandler.removeAndroidBackButtonHandler);
    }, []);

    function getDateString(){
        const date = new Date(new Date().getTime() + (isTommorow === true ? 86400000 : 0));

        const day = date.getDate();
        let month = 'Unknown month';

        switch(date.getMonth()){
            case 0: month = 'January'; break;
            case 1: month = 'February'; break;
            case 2: month = 'March'; break;
            case 3: month = 'April'; break;
            case 4: month = 'May'; break;
            case 5: month = 'June'; break;
            case 6: month = 'July'; break;
            case 7: month = 'August'; break;
            case 8: month = 'September'; break;
            case 9: month = 'October'; break;
            case 10: month = 'November'; break;
            case 11: month = 'December'; break;
        }

        return `${day} ${month}`
    }  

    function handleNameCommit(text) {
        PlanningManager.setName(text);
    }

    function handleDetailsCommit(text) {
        PlanningManager.setDetails(text);
    }

    function handleTimeCommit(date){
        PlanningManager.setStartTime(date.getTime());
    }

    function handleDurationCommit(duration){
        PlanningManager.setFocusDuration(duration);
    }

    function handleDeleteButton() {
        PlanningManager.deleteTask();
    }

    function handleAddButton() {
        PlanningManager.addTask();
    }

    function handleFinishButton(){    
        navigation.goBack();
    }

    return (
        <View className="w-full bg-background dark:bg-backgroundEssentialDRK" style={{ minHeight: Math.round(windowHeight) }}>
            <ExpoStatusBar style='auto' translucent/>
            <Pressable onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView className="w-[93%] h-full flex content-center mx-auto justify-start" style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 7 : 0, paddingBottom: Platform.OS === 'android' ? Dimensions.get('screen').height - Dimensions.get('window').height + StatusBar.currentHeight : 0 }}>                                
                    {/* Header */}
                    <Text className="text-3xl sm:text-4xl mt-4 font-semibold text-center text-headerText dark:text-headerTextDRK">{getDateString()}</Text>

                    {/* Tasks */}
                    <ScrollView className="mt-4 md:mt-7 rounded-xl" style={Platform.OS === 'android' ? {overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16} : {}}>
                        {
                            (isTommorow === true && PlanningManager.tasksForTomorrow.length <= 0) || (isTommorow === false && PlanningManager.tasksForToday.length <= 0)
                                ? <Pressable className="m-auto mt-3" onPress={handleAddButton} hitSlop={30} key={3147}>
                                    <Animated.Text className="text-center text-grayTextButton dark:text-grayTextButtonDRK text-xl" entering={FadeIn} exiting={FadeOut}>Tap to add a task</Animated.Text>
                                </Pressable>
                                : <></>
                        }

                        {
                            isTommorow === true
                                ? PlanningManager.tasksForTomorrow.map(data => {
                                    return <TaskIsland data={data} key={data.id} />
                                })
                                : PlanningManager.tasksForToday.map(data => {
                                    return <TaskIsland data={data} key={data.id} />
                                })
                        }
                        <View className="h-16 sm:h-32"/>
                    </ScrollView>
                    
                    <Divider style="mt-2 sm:mt-3" />

                    {/* Fields */}
                    <View className="mb-16 sm:mb-28 md:mb-40">                    
                        <InputField style="mt-3 sm:mt-3 md:mt-5" placeholder="Name..." value={PlanningManager.name} onChange={handleNameCommit} />
                        <InputField style="mt-4" placeholder="Details..." value={PlanningManager.details} onChange={handleDetailsCommit} />                        
                        <InputTimeField style="mt-6" onCommit={handleTimeCommit}/>
                        <InputDurationField style="mt-4" onCommit={handleDurationCommit}/>

                        <Pressable className="mt-3 sm:mt-5" hitSlop={10} onPress={handleDeleteButton}>
                            <Text className="text-lg text-headerDescr dark:text-headerDescrDRK font-medium text-center">Delete the task</Text>
                        </Pressable>
                    </View>    

                    <BlueButton text='Add task' onPress={handleAddButton} />   

                    <AbsoluteTextButton onPress={handleFinishButton} text='Finish'/>

                </SafeAreaView>
            </Pressable>
        </View>
    );
});

export default Planning;