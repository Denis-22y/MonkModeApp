import { View, Text, SafeAreaView, KeyboardAvoidingView, Keyboard, Pressable, ScrollView, useWindowDimensions, StatusBar, Platform } from 'react-native';

import TextButton from '../../components/buttons/TextButton';
import LargeInput from '../../components/setupPeriodComponents/LargeInput';
import NonNegotiableView from '../../components/setupPeriodComponents/NonNegotiableView';
import NonNegotiableSuggestionView from '../../components/setupPeriodComponents/NonNegotiableSuggestionView';

import { observer } from "mobx-react-lite";
import { useNavigation } from '@react-navigation/native';
import SetupPeriodStore from '../../scripts/managers/SetupPeriodStore';
import BackButtonHandler from '../../scripts/assistive/BackButtonHandler';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EnteringSetupNonNegotiables = observer((props) => {
    const navigation = useNavigation();
    const windowHeight = useWindowDimensions().height;
    const insets = useSafeAreaInsets();

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

    const handleBackButton = () => {        
        navigation.goBack();
    }

    const handleInputCommit = (text) => {                  
        SetupPeriodStore.addNonNegotiable(text);
    }

    const handleContinueButton = () => {                              
        SetupPeriodStore.launchMonkModePeriod();

        navigation.navigate('Loading');
    }

    return (
        <View className="bg-background dark:bg-backgroundDRK" style={{ minHeight: Math.round(windowHeight)}}>
            <Pressable onPress={Keyboard.dismiss} accessible={false}>             
                <SafeAreaView className="flex items-center h-full w-[90%] m-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>                
                    <KeyboardAvoidingView className="w-full" behavior='position' keyboardVerticalOffset={20}>
                        {/* Header block */}
                        <View className="w-full mt-14">
                            <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Non-negotiables</Text>
                            <Text className="text-subText dark:text-subTextDRK text-center text-xl mt-2 w-[90%] mx-auto">Write down non-negotiable daily actions</Text>
                        </View>
                        
                        {/* Non-negotiables*/}
                        <View className="mt-3" style={{overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                            <ScrollView className="h-48 md:h-64" showsVerticalScrollIndicator={false}>
                                <View className="flex flex-row flex-wrap w-full h-42 sm:h-68 md:h-84">
                                    {
                                        SetupPeriodStore.nonNegotiables.map(object => 
                                            <NonNegotiableView name={object.name} key={object.name}/>
                                        )
                                    }

                                    {
                                        SetupPeriodStore.getNonNegotiableSuggestion() !== null 
                                        ? <NonNegotiableSuggestionView />
                                        : <></>
                                    }          
                                </View>
                            </ScrollView>
                        </View>

                        <LargeInput style="mt-4 md:mt-10" placeholder='Write it down...' onCommit={text => handleInputCommit(text)} clearOnFocus={true}/>
                    </KeyboardAvoidingView>
                    
                    {/* Continue button*/}
                    <Pressable className="w-full mt-auto mb-8 sm:mb-[15%]" style={{paddingBottom: Platform.OS === 'android' ? insets.bottom : 0}} onPress={handleContinueButton}>
                        <View className="h-12 bg-main dark:bg-mainDRK rounded-3xl">
                            <Text className="text-contrastText dark:text-contrastText m-auto text-center font-semibold text-[24px]">Launch</Text>
                        </View>
                    </Pressable>

                    <TextButton text='Back' style='self-start absolute mt-7 sm:mt-10 md:mt-12' onPress={handleBackButton}/> 
                </SafeAreaView>
            </Pressable>
        </View>
    );
})

export default EnteringSetupNonNegotiables;