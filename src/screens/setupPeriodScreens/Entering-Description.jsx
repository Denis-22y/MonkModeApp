import { View, Text, SafeAreaView, Platform, StatusBar, BackHandler, Alert } from 'react-native';

import WideButton from '../../components/setupPeriodComponents/WideButton';

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import BackButtonHandler from '../../scripts/assistive/BackButtonHandler';

function EnteringDescription(props) {    
    const navigation = useNavigation();   
    
    useEffect(() => { //Subscribe on ABB               
        navigation.addListener('focus', () => {
            BackButtonHandler.handleAndroidBackButton(() => { 
                Alert.alert('Confirm exit', 'Do you want to quit the app?', [{text: 'CANCEL', style: 'cancel'}, {text: 'OK', onPress: () => BackHandler.exitApp()}]); 
            })
        })
            
        navigation.addListener('blur', BackButtonHandler.removeAndroidBackButtonHandler);
    }, []);  

    const handleStartButton = () => {
        navigation.navigate('Entering-Preparation');
    }

    return (
        <View className="bg-background dark:bg-backgroundDRK">
            <SafeAreaView className="flex items-center h-full w-[90%] m-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>            
                
                {/* Header text */}
                <View className="mt-12 sm:mt-24 md:mt-32">
                    <Text className="text-xl font-medium text-center text-headerDescr dark:text-headerDescrDRK">WHAT IS</Text>
                    <Text className="text-5xl font-bold text-center text-headerText dark:text-headerTextDRK">MONK MODE</Text>
                </View>

                {/* Atteniton block */}
                <View className="mt-auto mb-10 sm:mb-14">
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Overview</Text>
                    <Text className="text-center text-lg md:text-xl mt-2.5 text-subText dark:text-subTextDRK">Monk Mode is a period when you commit yourself to high-level discipline by cutting off all distractions in order to build a business, a side hustle, a strong character, a great physique, mental clarity, or to break your inner limits.</Text>
                </View>

                {/* Continue button*/}
                <WideButton text='Start' onPress={handleStartButton}/>

            </SafeAreaView>
        </View>
    );
}

export default EnteringDescription;