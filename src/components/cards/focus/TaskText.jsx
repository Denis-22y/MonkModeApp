import { Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const styleVariants = {
    true: 'font-medium text-2xl text-center text-headerText dark:text-headerTextDRK',
    false: 'text-lg text-center text-headerDescr dark:text-headerDescrDRK'
}

function TaskText( {style='w-full', isBig=false, data={name: '', details: '', startTime: 0, focusDuration: 1} }) {
    const navigation = useNavigation();

    function getName(){
        if(data.name === '')
            return 'Untilted';
        else
            return data.name;
    }

    const handlePress = () => {        
        navigation.navigate('Focus', data);
    }    

    return (
        <Pressable className={style} onPress={handlePress} accessibilityLabel={`${data.name} ${data.id}`}>
            <Text className={styleVariants[isBig]}>{getName()}</Text>
        </Pressable>
    );
}

export default TaskText;