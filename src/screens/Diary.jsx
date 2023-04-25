import { View, Text, SafeAreaView, Platform, StatusBar, Dimensions, Pressable, Keyboard, useWindowDimensions } from 'react-native';

import Divider from '../components/cards/card/Divider';
import DiaryInputField from '../components/cards/diary/DiaryInputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BlueButton from '../components/buttons/BlueButton';

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackButtonHandler from '../scripts/assistive/BackButtonHandler';
import DiaryManager from '../scripts/managers/DiaryManager';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

function Diary( {route} ) {    
    const navigation = useNavigation();     
    const windowHeight = useWindowDimensions().height;

    const pageDate = route.params;  

    useEffect(() => {
        navigation.addListener('blur', () => DiaryManager.saveDaysList())
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
        const date = new Date(pageDate);

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

    function handleBlueButton(){
        navigation.goBack();
    }

    return (
        <View className="w-full bg-background dark:bg-backgroundEssentialDRK" style={{ minHeight: Math.round(windowHeight)}}>
            <ExpoStatusBar style='auto' translucent/>
            <Pressable onPress={Keyboard.dismiss} accessible={false}>     
                <SafeAreaView className="w-[93%] h-full flex content-center mx-auto justify-start" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight+7 : 0, paddingBottom: Platform.OS === 'android' ? Dimensions.get('screen').height - Dimensions.get('window').height + StatusBar.currentHeight : 0}}>                                                                                
                    {/* Header */}
                    <View className="mt-4">
                        <Text className="text-4xl font-semibold text-center text-headerText dark:text-headerTextDRK">{getDateString()}</Text>
                        <Divider style="mt-2"/>
                    </View>

                    {/* Themes */}                                            
                    <View className="mt-5" style={{overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16}}>
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardOpeningTime={0} enableOnAndroid={true}> 
                            <DiaryInputField placeholder='Morning' initialValue={DiaryManager.getThemeValue(pageDate, 0)} onCommit={text => DiaryManager.setTheme(pageDate, 0, text)}/>
                            <DiaryInputField placeholder='Evening' initialValue={DiaryManager.getThemeValue(pageDate, 1)} onCommit={text => DiaryManager.setTheme(pageDate, 1, text)}/>                        
                            
                            <View className="h-20 md:h-32"/>
                        </KeyboardAwareScrollView>                             
                    </View>

                    <BlueButton text='Return' onPress={handleBlueButton}/>
                </SafeAreaView>
            </Pressable>
        </View>
    );
}

export default Diary;