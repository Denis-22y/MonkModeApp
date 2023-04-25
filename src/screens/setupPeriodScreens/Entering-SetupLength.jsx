import { View, Text, SafeAreaView, StatusBar } from 'react-native';

import WideButton from '../../components/setupPeriodComponents/WideButton';
import TextButton from '../../components/buttons/TextButton';
import BigToggleButton from '../../components/setupPeriodComponents/BigToggleButton';

import { useNavigation } from '@react-navigation/native';
import SetupPeriodStore from '../../scripts/managers/SetupPeriodStore';
import { observer } from 'mobx-react-lite';

const EnteringSetupLength = observer((props) => {
    const navigation = useNavigation();

    const handleBackButton = () => {     
        navigation.goBack();     
    }

    const handleContinueButton = () => {
        navigation.navigate('Entering-SetupNonNegotiables');
    }

    return (
        <View className="bg-background dark:bg-backgroundDRK">
            <SafeAreaView className="flex items-center h-full w-[90%] m-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
                {/* Header text */}
                <View className="mt-12 sm:mt-24 md:mt-32">
                    <Text className="text-xl font-medium text-center text-headerDescr dark:text-headerDescrDRK">ENTERING</Text>
                    <Text className="text-5xl font-bold text-center text-headerText dark:text-headerTextDRK">MONK MODE</Text>
                </View>

                {/* Atteniton block */}
                <View className="w-full mt-32 md:mt-48">
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">How long?</Text>
                    <View className="flex flex-row justify-between w-full mt-8">
                        <BigToggleButton text='week' chosen={SetupPeriodStore.isChosen(0)} onPress={() => {SetupPeriodStore.setDate(0)}}/>
                        <BigToggleButton text='month' chosen={SetupPeriodStore.isChosen(1)} onPress={() => {SetupPeriodStore.setDate(1)}}/>
                        <BigToggleButton text='3 month' chosen={SetupPeriodStore.isChosen(2)} onPress={() => {SetupPeriodStore.setDate(2)}}/>
                    </View>
                </View>

                {/* Continue button*/}
                <View className="mt-auto w-full"> 
                        <WideButton text='Continue' onPress={handleContinueButton}/>
                    </View>

                <TextButton text='Back' style='self-start absolute mt-7 sm:mt-10 md:mt-12' onPress={handleBackButton}/>                
            </SafeAreaView>
        </View>
    );
})

export default EnteringSetupLength;
