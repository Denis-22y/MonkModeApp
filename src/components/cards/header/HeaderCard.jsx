import { Alert, Pressable, Text } from "react-native";

import Card from "../card/Card";
import Divider from "../card/Divider";

import PeriodManager from '../../../scripts/managers/PeriodManager';
import { useNavigation } from "@react-navigation/native";

function HeaderCard( {style} ) {     
    const navigation = useNavigation();    

    function handleCreateNewPeriodButton(){
        Alert.alert(`Are you sure?`, 'Do you want to create a new Monk Mode period?', [{text: 'Cancel', style: 'cancel'}, {text: 'Create', onPress: () => navigation.navigate('Entering-Description')}]); 
    }

    return (
        <Card style={style}>
            <Pressable onPress={handleCreateNewPeriodButton}>
                <Text className="text-xl font-medium text-center text-subText dark:text-subTextDRK">{PeriodManager.remainingDaysString}</Text>
            </Pressable>
            <Divider style="my-1.5"/>
            <Text className="text-xl font-semibold text-center text-headerText dark:text-headerTextDRK">{PeriodManager.goal}</Text>
        </Card>
    );
}

export default HeaderCard;