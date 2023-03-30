import { Pressable, Text, View } from 'react-native';

import Card from '../card/Card';
import Divider from '../card/Divider';

import { useNavigation } from '@react-navigation/native';
import PlanningManager from '../../../scripts/managers/PlanningManager';

function getTomorrowText(){                
    if(PlanningManager.tasksForTomorrow.length <= 0)
        return 'Plan the next day';
    else
        return 'Edit the next day';
}

function getTodayText(){
    if(PlanningManager.tasksForToday.length <= 0)
        return 'Plan today';
    else
        return 'Edit today';
}

function DiaryCard( {style} ) { 
    const navigation = useNavigation();

    function handleNextDay(){
        navigation.navigate('Planning', [true]);
    }
    
    function handleToday(){
        navigation.navigate('Planning', [false]);
    }

    return (
        <Card style={style}>
            <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Planning</Text>            
            <Divider style="mt-1.5"/>   
            
            <View className="mt-5 mb-2">
                <Pressable hitSlop={5} onPress={handleNextDay}>
                    <Text className="text-xl font-medium text-center text-grayTextButton dark:text-grayTextButtonDRK">{getTomorrowText()}</Text>
                </Pressable>
                <Pressable className="mt-4" hitSlop={5} onPress={handleToday}>
                    <Text className="text-xl font-medium text-center text-grayTextButton dark:text-grayTextButtonDRK">{getTodayText()}</Text>
                </Pressable>
            </View>

        </Card>
    );
}

export default DiaryCard;