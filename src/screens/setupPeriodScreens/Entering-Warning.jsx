import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';

import WideButton from '../../components/setupPeriodComponents/WideButton';
import TextButton from '../../components/buttons/TextButton';

import { useNavigation } from '@react-navigation/native';

function EnteringWarning(props) {
    const navigation = useNavigation();

    const handleBackButton = () => {     
        navigation.goBack();  
    }

    const handleContinueButton = () => {
        navigation.navigate('Entering-SetupGoal');
    }

    return (
        <View className="bg-background dark:bg-backgroundDRK">
            <SafeAreaView className="flex items-center h-full w-[90%] m-auto" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
                {/* Header text */}
                <View className="mt-48">
                    <Text className="text-xl font-medium text-center text-headerDescr dark:text-headerDescrDRK">ENTERING</Text>
                    <Text className="text-5xl font-bold text-center text-headerText dark:text-headerTextDRK">MONK MODE</Text>
                </View>

                {/* Atteniton block */}
                <View className="mt-auto mb-14">
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Are you sure?</Text>
                    <Text className="text-subText dark:text-subTextDRK text-center text-xl mt-2.5">Please don't do Monk Mode when{`\n`}you are exhausted or tired.{`\n`}Monk Mode requires a lot of effort{`\n`}from you. But if you want to test{`\n`}yourself - start right now!</Text>
                </View>

                {/* Continue button*/}
                <WideButton text='Continue' style='w-full mb-14' onPress={handleContinueButton}/>

                <TextButton text='Back' style='self-start absolute mt-11' onPress={handleBackButton}/>                
            </SafeAreaView>
        </View>
    );
}

export default EnteringWarning;

{/* */}