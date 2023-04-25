import { View, Text, SafeAreaView, Platform, StatusBar, Pressable } from 'react-native';

import BlueButton from '../components/buttons/BlueButton';

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import FocusManager from '../scripts/managers/FocusManager';
import PlanningManager from '../scripts/managers/PlanningManager';
import { observer } from 'mobx-react-lite';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import BackButtonHandler from '../scripts/assistive/BackButtonHandler';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TEXT_DURATION = 400;

const Focus = observer(( {route} ) => {    
    const navigation = useNavigation();    
    const [blueButtonText, setBlueButtonText] = useState();   
    const [subText, setSubText] = useState();    
    const insets = useSafeAreaInsets();

    const taskData = route.params;    

    useEffect(() => { // First render                            
        FocusManager.startup(taskData.name, taskData.focusDuration);     
        
        navigation.addListener('beforeRemove', () => { // Subcription on removing the screen                        
            FocusManager.shutdown();
        });

        return navigation.removeListener('beforeRemove', () => {});
    }, []);    

    useEffect(() => { //Subscribe on ABB               
        navigation.addListener('focus', () => {
            BackButtonHandler.handleAndroidBackButton(() => { 
                navigation.goBack();
            })
        })
        
        navigation.addListener('blur', BackButtonHandler.removeAndroidBackButtonHandler);
    }, []);   

    useEffect(() => {
        switch(FocusManager.stateId){
            case 0: 
                changeSubText(getPlannedTimeString());
                changeBlueButtonText('Focus');                
                break;
            case 1: 
                changeSubText('You are distracted');
                changeBlueButtonText('Stop');                
                break;
            case 2:
                changeSubText('Relax');
                changeBlueButtonText('Focus');                
                break;
        }
    }, [FocusManager.stateId]);

    function getPlannedTimeString() {
        const startTime = taskData.startTime;

        const hours = new Date(startTime).getHours();
        const minutes = new Date(startTime).getMinutes();

        return `Planned for ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    function changeSubText(newText){
        let currentStr = newText[0];
        let i = 1;

        const intervalID = setInterval(() => {            
            if(i >= newText.length-1)
                clearInterval(intervalID);
            
            currentStr += newText[i];
            i++;

            setSubText(currentStr);            
        }, TEXT_DURATION/newText.length);
    }

    function changeBlueButtonText(newText){
        let currentStr = newText[0];
        let i = 1;

        const intervalID = setInterval(() => {            
            if(i >= newText.length-1)
                clearInterval(intervalID);
            
            currentStr += newText[i];
            i++;

            setBlueButtonText(currentStr);            
        }, TEXT_DURATION/newText.length);
    }

    function getName(){
        if(taskData.name === '')
            return 'Untilted';
        else
            return taskData.name;
    }

    function handleBlueButton(){
        switch (FocusManager.stateId) {
            case 0:
            case 2: FocusManager.startFocus(); break;
            case 1: FocusManager.startRelax(); break;
        }
    }

    function handleBackButton(){               
        navigation.goBack();
    }        
    
    function handleFinishButton(){        
        PlanningManager.deleteTask(taskData.id);
        navigation.goBack();
    }        

    return (
        <View className="w-full h-full bg-background dark:bg-backgroundDRK">   
            <ExpoStatusBar style='auto' translucent/>
            
            <SafeAreaView className="w-[93%] h-full flex content-center mx-auto justify-start" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>                                                                                
                <View className="h-12"/>
                {/* Header */}
                <View className="mt-2">
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">{getName()}</Text>
                    <Text className="mt-1 text-xl text-center text-subText dark:text-subTextDRK">{taskData.details}</Text>
                </View>

                {/* Timer & subText */}
                <View className="absolute top-0 bottom-0 left-0 right-0 justify-center align-middle">
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">{FocusManager.remainingTimeString}</Text>
                    <Text className="text-base text-center text-headerDescr dark:text-headerDescrDRK">{subText}</Text>                    
                </View>

                <View className="absolute flex flex-row w-full mt-1 sm:mt-2 md:mt-0" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top}}>
                    {/* Back && Finish buttons */
                        FocusManager.stateId === 0 || FocusManager.stateId === 2
                        ? <>
                            <Animated.View entering={FadeIn} exiting={FadeOut}>
                                <Pressable className="relative" hitSlop={30} onPress={handleBackButton}>           
                                    <Text className="text-xl font-medium text-grayTextButton dark:text-grayTextButtonDRK">Back</Text>
                                </Pressable>
                            </Animated.View>
                            <Animated.View className="ml-auto" entering={FadeIn} exiting={FadeOut}>
                                <Pressable className="relative right-0" hitSlop={30} onPress={handleFinishButton}>
                                    <Text className="ml-auto text-xl font-medium text-grayTextButton dark:text-grayTextButtonDRK">Finish</Text>                                    
                                </Pressable>     
                            </Animated.View>
                        </> : <></>
                    }   
                </View>
            </SafeAreaView>

            <BlueButton text={blueButtonText} onPress={handleBlueButton}/>    
        </View>
    );
})

export default Focus;
