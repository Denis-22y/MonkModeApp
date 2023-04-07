import { View, Text, Pressable } from 'react-native';

import PeriodManager from '../../../scripts/managers/PeriodManager';

const viewStyleVariants = {
    true: 'h-10 w-56 border border-grayTextButton dark:border-grayTextButtonDRK rounded-3xl flex flex-row justify-between items-center px-3.5 mr-3',
    false: 'h-10 w-52 bg-diaryDay dark:bg-diaryDayDRK rounded-3xl flex flex-row justify-between items-center px-3.5 mr-3'
}

const textDayStyleVariants = {
    true: 'font-medium text-xl text-grayTextButton dark:text-grayTextButtonDRK',
    false: 'font-medium text-xl text-contrastText'
}

const textDateStyleVariants = {
    true: 'font-regular text-xl text-grayTextButton dark:text-grayTextButtonDRK text-right',
    false: 'font-regular text-xl text-contrastText text-right'
}

function DiaryDay( {style, isEmpty=false, dateTime, onPress=()=>{}} ) {
    const differenceInDays = Math.trunc((dateTime - PeriodManager.startTime) / 86400000) + 1;
    
    function getDateString(){
        const date = new Date(dateTime);
        
        return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${date.getMonth() < 10 ? '0' : ''}${date.getMonth()+1}`;
    }

    return (
        <View className={style}>
            <Pressable className={viewStyleVariants[isEmpty]} onPress={onPress}>
                <Text className={textDayStyleVariants[isEmpty]}>{differenceInDays <= 0 ? 'Past period' : `Day ${differenceInDays}`}</Text>                                        
                <Text className={textDateStyleVariants[isEmpty]}>{getDateString()}</Text>
            </Pressable>
        </View>
    );
}

export default DiaryDay;