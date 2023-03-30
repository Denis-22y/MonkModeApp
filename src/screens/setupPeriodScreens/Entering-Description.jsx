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
        navigation.navigate('Entering-Warning');
    }

    return (
        <View className="bg-background dark:bg-backgroundDRK">
            <SafeAreaView className="flex items-center h-full w-[90%] m-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>            
                
                {/* Header text */}
                <View className="mt-48">
                    <Text className="text-xl font-medium text-center text-headerDescr dark:text-headerDescrDRK">WHAT IS</Text>
                    <Text className="text-5xl font-bold text-center text-headerText dark:text-headerTextDRK">MONK MODE</Text>
                </View>

                {/* Atteniton block */}
                <View className="mt-auto mb-14">
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">You need this</Text>
                    <Text className="text-center text-xl mt-2.5 text-subText dark:text-subTextDRK">Monk Mode is a period of enhanced focus, discipline, and productivity{'\n'}where you commit yourself to{'\n'}completing a goal. Usually it takes{'\n'}about a month and dedicated to{'\n'}self-improvement.</Text>
                </View>

                {/* Continue button*/}
                <WideButton text='Start' style='mb-14 w-full' onPress={handleStartButton}/>

            </SafeAreaView>
        </View>
    );
}

export default EnteringDescription;