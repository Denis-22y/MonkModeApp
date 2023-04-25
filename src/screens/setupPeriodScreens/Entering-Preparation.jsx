import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';

import WideButton from '../../components/setupPeriodComponents/WideButton';
import TextButton from '../../components/buttons/TextButton';
import VertcialDivider from '../../components/cards/focus/VerticalDivider';

import { useNavigation } from '@react-navigation/native';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

function EnteringPreparation(props) {
    const navigation = useNavigation();

    const handleBackButton = () => {     
        navigation.goBack();  
    }

    const handleContinueButton = () => {
        navigation.navigate('Entering-SetupGoal');
    }

    return (
        <View className="bg-background dark:bg-backgroundDRK">
            <ExpoStatusBar style='auto' translucent/>
            <SafeAreaView className="flex items-center h-full w-[90%] m-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
                {/* Header text */}
                <View className="mt-12 sm:mt-24 md:mt-32">
                    <Text className="text-xl font-medium text-center text-headerDescr dark:text-headerDescrDRK">GUIDE</Text>
                    <Text className="text-5xl font-bold text-center text-headerText dark:text-headerTextDRK">MONK MODE</Text>
                </View>

                {/* Atteniton block */}
                <View className="mt-auto mb-14">
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Preparation</Text>
                    <View className="mt-5">
                        <Text className="text-xl text-subText dark:text-headerDescrDRK text-center">Quit social networks</Text>
                        <VertcialDivider style="mb-1 mt-1.5"/>
                        <Text className="text-xl text-subText dark:text-headerDescrDRK text-center">Limit distractions</Text>
                        <VertcialDivider style="mb-1 mt-1.5"/>
                        <Text className="text-xl text-subText dark:text-headerDescrDRK text-center">Do dopamine detox</Text>                        
                        <Text className="text-base text-headerDescr dark:text-[#555555] text-center">At least 2 days</Text>
                    </View>
                </View>

                {/* Continue button*/}
                <WideButton text='Continue' onPress={handleContinueButton}/>

                <TextButton text='Back' style='self-start absolute mt-7 sm:mt-10 md:mt-12' onPress={handleBackButton}/>                
            </SafeAreaView>
        </View>
    );
}

export default EnteringPreparation;
