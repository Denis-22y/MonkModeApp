import { Alert, Appearance, BackHandler, Keyboard, Platform, StatusBar, View } from 'react-native';

import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as FileSystem from 'expo-file-system';
import Animated, { FadeIn } from 'react-native-reanimated';
import BackButtonHandler from '../scripts/assistive/BackButtonHandler';
import PeriodManager from '../scripts/managers/PeriodManager';
import PlanningManager from '../scripts/managers/PlanningManager';
import DiaryManager from '../scripts/managers/DiaryManager';
import NonNegotiablesManager from '../scripts/managers/NonNegotiablesManager';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

function Loading(props) {
    const navigation = useNavigation();   
    const [showWarning, setShowWarning] = useState(false); 
    
    useEffect(() => { //Subscribe on ABB               
        navigation.addListener('focus', () => {
            BackButtonHandler.handleAndroidBackButton(() => { 
                Alert.alert('Confirm exit', 'Do you want to quit the app?', [{text: 'CANCEL', style: 'cancel'}, {text: 'OK', onPress: () => BackHandler.exitApp()}]); 
            })
        })
        
        navigation.addListener('blur', BackButtonHandler.removeAndroidBackButtonHandler);
    }, []);      

    useEffect(() => {
        Appearance.addChangeListener(() => {
            if(Appearance.getColorScheme() === 'dark')
                StatusBar.setBarStyle('light-content');
            else
                StatusBar.setBarStyle('dark-content');
        });

        let timeoutId;

        navigation.addListener('focus', () => {

            timeoutId = setTimeout(() => {
                setShowWarning(true);
            }, 2000);

            FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'PlanningData.json')
                .then(contentStr => {    
                    if(contentStr === '')        
                        PlanningManager.setTasks([]);            
                    else
                        PlanningManager.setTasks(JSON.parse(contentStr));            
                }, 
                err => {
                    //console.log(Platform.OS + ' - An error occurated with the PlanningData.json: ' + err);            
                })
            .then(
                FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'NonNegotiablesData.json')
                .then(contentStr => {    
                    if(contentStr === '')        
                        NonNegotiablesManager.setNonNegotiables([]);                        
                    else
                        NonNegotiablesManager.setNonNegotiables(JSON.parse(contentStr));                        
                }, 
                err => {
                    //console.log(Platform.OS + ' - An error occurated with the NonNegotiablesData.json: ' + err);            
                }))
            .then(
                FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'DiaryData.json')
                .then(contentStr => {            
                    if(contentStr === '')
                        DiaryManager.setDaysList([]);                        
                    else
                        DiaryManager.setDaysList(JSON.parse(contentStr));                        
                }, 
                err => {
                    //console.log(Platform.OS + ' - An error occurated with the DiaryData.json: ' + err);            
                }))
            .then(
                FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'PeriodPreferences.json')
                .then(contentStr => {                        
                    if(contentStr === '')
                        navigation.navigate('Entering-Description');            

                    PeriodManager.setPeriodPreferences(JSON.parse(contentStr));

                    if(new Date().getTime() <= PeriodManager.endTime){
                        PeriodManager.setIsValid(false);                          
                    }
                    
                    navigation.navigate('Main');
                }, 
                err => {
                    //console.log(Platform.OS + ' - An error occurated with the PeriodPreferences.json: ' + err);
                    navigation.navigate('Entering-Description');
                }));

                Keyboard.addListener('keyboardDidHide', () => {
                    Keyboard.dismiss()
                });    
        });

        navigation.addListener('blur', () => {clearTimeout(timeoutId)});
    }, []);
    
    return (
        <View className="w-screen h-screen bg-background dark:bg-backgroundDRK" accessibilityLabel='Loading'>
            <ExpoStatusBar style='auto' translucent/>
            {
                showWarning === true
                ? <>
                    <Animated.Text className="my-auto text-xl text-center text-headerText dark:text-headerTextDRK" entering={FadeIn}>Hi there, wait a little bit</Animated.Text>
                </>
                : <></>
            }            
        </View>        
    );    
}

export default Loading;
