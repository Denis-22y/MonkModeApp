import { View, SafeAreaView, Platform, ScrollView, Alert, BackHandler, StatusBar } from 'react-native';

import HeaderCard from '../components/cards/header/HeaderCard';
import TaskCard from '../components/cards/focus/TaskCard';
import DiaryCard from '../components/cards/diary/DiaryCard';
import PlanningCard from '../components/cards/planning/PlanningCard';

import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import NonNegotiablesCard from '../components/cards/nonNegotiables/NonNegotiablesCard';
import { useNavigation } from '@react-navigation/native';
import BackButtonHandler from '../scripts/assistive/BackButtonHandler';
import PeriodManager from '../scripts/managers/PeriodManager';
import NonNegotiablesManager from '../scripts/managers/NonNegotiablesManager';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

function Main(props) {    
    const navigation = useNavigation();        

    //#region Rerender when the screen becomes active    
        const useForceRerendering = () => {
            const [counter, setCounter] = useState(0);
            return () => setCounter(counter => counter + 1);
        };    
    
        const forceRerendering = useForceRerendering();  

        navigation.addListener('focus', () => {forceRerendering();});
    //#endregion

    useEffect(() => { //Subscribe on ABB               
        if(Platform.OS === 'android'){
            navigation.addListener('focus', () => {
                BackButtonHandler.handleAndroidBackButton(() => { 
                    Alert.alert('Confirm exit', 'Do you want to quit the app?', [{text: 'CANCEL', style: 'cancel'}, {text: 'OK', onPress: () => BackHandler.exitApp()}]); 
                })
            })
            
            navigation.addListener('blur', BackButtonHandler.removeAndroidBackButtonHandler);
        }
    }, []);   

    useEffect(() => {    
        Notifications.getPermissionsAsync().then(notificationPermissionsStatus => { // Notifications permisson request
            if(notificationPermissionsStatus.granted === false){
                Notifications.requestPermissionsAsync();
            } else {
                Notifications.setNotificationHandler({ handleNotification: async () => ({shouldPlaySound: true, shouldShowAlert: true})});
            }
        });           
        
        if(new Date().getTime() >= PeriodManager.endTime){
            Alert.alert(`You've finished the period`, 'Do you want to create another Monk Mode period?', [{text: 'No', style: 'cancel'}, {text: 'Create', onPress: () => navigation.navigate('Entering-Description')}]); 
        } 
    }, [])        

    return (
        <View className="w-full h-screen bg-backgroundEssential dark:bg-backgroundEssentialDRK">
            <ExpoStatusBar style='auto' translucent/>
            <SafeAreaView className="w-[95%] h-full flex content-center mx-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>                                
            <View style={{overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16}}>
                <ScrollView className="w-full h-screen" showsVerticalScrollIndicator={false}>
                        <HeaderCard style="mt-2"/>
                        <TaskCard style="mt-1.5"/>
                        {
                            NonNegotiablesManager.haveNonNegotiables === true
                            ? <NonNegotiablesCard />
                            : <></>
                        }                        
                        <DiaryCard />
                        <PlanningCard />
                        <View className="h-32"/>
                </ScrollView>
            </View>
            </SafeAreaView>        
        </View>
    );
}

export default Main;

/* 
TODO:
    1. Status bar color theme (include research)
*/