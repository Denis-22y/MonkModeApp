import { View, Text, SafeAreaView, Platform, StatusBar, Dimensions, Pressable, Keyboard, useWindowDimensions, ScrollView } from 'react-native';

import BlueButton from '../components/buttons/BlueButton';
import Divider from '../components/cards/card/Divider';

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackButtonHandler from '../scripts/assistive/BackButtonHandler';
import TaskIsland from '../components/cards/planning/TaskIsland';
import PlanningManager from '../scripts/managers/PlanningManager';
import InputField from '../components/cards/planning/InputField';
import { observer } from 'mobx-react-lite';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import InputTimeField from '../components/cards/planning/InputTimeField';
import InputDurationField from '../components/cards/planning/InputDurationField';

const Planning = observer(({ route }) => {
    const navigation = useNavigation();
    const windowHeight = useWindowDimensions().height;

    const isTommorow = route.params[0];

    useEffect(() => {
        PlanningManager.setIsTomorrow(isTommorow);

        navigation.addListener('blur', () => PlanningManager.saveTasksList())
    }, []);

    useEffect(() => { //Subscribe on ABB               
        navigation.addListener('focus', () => {
            BackButtonHandler.handleAndroidBackButton(() => {
                navigation.goBack();
            })
        })

        navigation.addListener('blur', BackButtonHandler.removeAndroidBackButtonHandler);
    }, []);

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
//style={{ minHeight: Math.round(windowHeight) }}
    return (
        <View className="w-full bg-background dark:bg-backgroundEssentialDRK" >
            <Pressable onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView className="w-[93%] h-full flex content-center mx-auto justify-start" style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 7 : 0, paddingBottom: Platform.OS === 'android' ? Dimensions.get('screen').height - Dimensions.get('window').height + StatusBar.currentHeight : 0 }}>                    
                    <Pressable className="ml-auto mt-2 w-1/6" hitSlop={25} onPress={handleFinishButton}>
                        <Text className="ml-auto text-right text-xl font-medium text-grayTextButton dark:text-grayTextButtonDRK">Finish</Text>                                    
                    </Pressable> 

                    {/* Header */}
                    <View className="">
                        <Text className="text-4xl font-semibold text-center text-headerText dark:text-headerTextDRK">Planning</Text>
                    </View>

                    {/* Tasks */}
                    <ScrollView className="mt-7 rounded-xl">

                        {
                            (isTommorow === true && PlanningManager.tasksForTomorrow.length <= 0) || (isTommorow === false && PlanningManager.tasksForToday.length <= 0)
                                ? <Pressable className="m-auto" onPress={handleAddButton} hitSlop={30} key={3147}>
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

                        <View className="h-32"/>
                    </ScrollView>

                    <Divider style="mt-4" />

                    {/* Fields */}
                    <View className="mb-36">
                        <InputField style="mt-5" placeholder="Name..." value={PlanningManager.name} onChange={handleNameCommit} />
                        <InputField style="mt-4" placeholder="Details..." value={PlanningManager.details} onChange={handleDetailsCommit} />
                        <InputTimeField style="mt-6" onCommit={handleTimeCommit}/>
                        <InputDurationField style="mt-4" onCommit={handleDurationCommit}/>

                        <Pressable className="mt-5" hitSlop={5} onPress={handleDeleteButton}>
                            <Text className="text-lg text-headerDescr dark:text-headerDescrDRK font-medium text-center">Delete the task</Text>
                        </Pressable>
                    </View>

                    <BlueButton text='Add task' onPress={handleAddButton} />                     
                </SafeAreaView>
            </Pressable>
        </View>
    );
});

export default Planning;
