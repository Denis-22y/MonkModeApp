import { Pressable, Text, View, useColorScheme } from 'react-native';

import { useEffect, useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PlanningManager from '../../../scripts/managers/PlanningManager';
import { observer } from 'mobx-react-lite';

const InputDurationField = observer(({ style, onCommit = () => {} }) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const theme = useColorScheme();
    const [text, setText] = useState('7:00');
    const [date, setDate] = useState(new Date(0));

    const emptyDate = new Date();
    emptyDate.setHours(0);
    emptyDate.setMinutes(0);
    emptyDate.setSeconds(0);
    emptyDate.setMilliseconds(0);

    useEffect(() => {
        updateDate();
        updateText();
    }, [PlanningManager.selectedTaskIndex]);

    function updateDate(){
        const differenceDate = new Date(emptyDate.getTime() + PlanningManager.selectedTask.focusDuration*1000);

        setDate(differenceDate);
    }

    function updateText(){
        const differenceDate = new Date(emptyDate.getTime() + PlanningManager.selectedTask.focusDuration*1000);

        const hours = differenceDate.getHours();
        const minutes = differenceDate.getMinutes();

        let result = '';

        if(hours !== 0){
            result += `${hours} ${hours === 1 ? 'hour' : 'hours'} `;
        }

        result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;

        setText(result);
    }

    function handleDurationPicker(date){
        setIsPickerVisible(false);

        const duration = (date.getHours()*60 + date.getMinutes()) * 60;
        
        onCommit(duration);

        updateDate();
        updateText();
    }

    return (
        <Pressable className={style} hitSlop={10} onPress={() => setIsPickerVisible(!isPickerVisible)}>
            <DateTimePicker isVisible={isPickerVisible} mode='time' textColor={theme === 'dark' ? '#FFF' : '#333'} accentColor={theme === 'dark' ? '#FFF' : '#333'} onConfirm={handleDurationPicker} is24Hour={true} locale='es-ES' display='spinner' date={date} onCancel={() => {setIsPickerVisible(false)}}/>
            <View className="bg-inputBackground dark:bg-inputBackgroundDRK rounded-3xl px-3.5 h-10">
                <Text className="text-grayText text-center my-auto" style={{ fontSize: 20 }}>{text}</Text>
            </View>
        </Pressable>
    );
});

export default InputDurationField;