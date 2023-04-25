import { View, Text, SafeAreaView, KeyboardAvoidingView, Keyboard, Pressable, Platform, StatusBar, useWindowDimensions } from 'react-native';

import WideButton from '../../components/setupPeriodComponents/WideButton';
import LargeInput from '../../components/setupPeriodComponents/LargeInput';
import TextButton from '../../components/buttons/TextButton';
import Warning from '../../components/setupPeriodComponents/Warning';

import { useRef } from 'react';
import { observer } from "mobx-react-lite";
import { useNavigation } from '@react-navigation/native';
import SetupPeriodStore from '../../scripts/managers/SetupPeriodStore';

const EnteringSetupGoal = observer((props) => {
    const navigation = useNavigation();
    const warningRef = useRef(null);
    const windowHeight = useWindowDimensions().height;

    const handleBackButton = () => {        
        navigation.goBack();
    }
    
    const handleContinueButton = () => {
        if(SetupPeriodStore.isGoalEmpty()){
            warningRef.current.flash();
        } else {                        
            navigation.navigate('Entering-SetupLength');
        }
    }
    
    const handleInputCommit = (text) => {        
        SetupPeriodStore.setGoal(text);
    }

    return (
        <View className="bg-background dark:bg-backgroundDRK" style={{ minHeight: Math.round(windowHeight)}}>
            <Pressable onPress={Keyboard.dismiss} accessible={false}>             
                <SafeAreaView className="flex items-center h-full w-[90%] m-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>                
                    <KeyboardAvoidingView className="w-full" behavior='position' keyboardVerticalOffset={20}>
                        {/* Header text */}
                        <View className="mt-12 sm:mt-24 md:mt-32">
                            <Text className="text-xl font-medium text-center text-headerDescr dark:text-headerDescrDRK">ENTERING</Text>
                            <Text className="text-5xl font-bold text-center text-headerText dark:text-headerTextDRK">MONK MODE</Text>
                        </View>

                        {/* Atteniton block */}
                        <View className="w-full mt-32 md:mt-48">
                            <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">What's your goal?</Text>
                            <LargeInput style="mt-7" placeholder='I will...' onChange={text => handleInputCommit(text)} defaultValue={SetupPeriodStore.preferences.goal} />
                            <Warning style="mt-4" text='Please, enter your goal' ref={warningRef}/>
                        </View>
                    </KeyboardAvoidingView>
                    
                    {/* Continue button*/}
                    <View className="mt-auto w-full"> 
                        <WideButton text='Continue' onPress={handleContinueButton}/>
                    </View>

                    <TextButton text='Back' style='self-start absolute mt-7 sm:mt-10 md:mt-12' onPress={handleBackButton}/> 
                </SafeAreaView>
            </Pressable>
        </View>
    );
})

export default EnteringSetupGoal;