import { Pressable, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PlanningManager from '../../../scripts/managers/PlanningManager';
import { observer } from 'mobx-react-lite';

const InputTimeField = observer(({ style, onCommit = () => {} }) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [text, setText] = useState('7:00');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const date = new Date(PlanningManager.selectedTask.startTime);
        
        setDate(date);
        updateText(date);
    }, [PlanningManager.selectedTaskIndex]);

    function updateText(date){
        const hours =  `${date.getHours() <= 9 ? '0' : ''}${date.getHours()}`;
        const minutes = `${date.getMinutes() <= 9 ? '0' : ''}${date.getMinutes()}`;

        setText(`${hours}:${minutes}`);
    }

    function handleTimePicker(date=new Date()){
        setIsPickerVisible(false);

        updateText(date);

        onCommit(date);
    }

    return (
        <Pressable className={style} hitSlop={10} onPress={() => setIsPickerVisible(!isPickerVisible)}>
            <DateTimePicker isVisible={isPickerVisible} mode='time' onConfirm={handleTimePicker} date={date} onCancel={() => {setIsPickerVisible(false)}}/>
            <View className="bg-inputBackground dark:bg-inputBackgroundDRK rounded-3xl px-3.5 h-10">
                <Text className="text-grayText text-center my-auto" style={{ fontSize: 20 }}>{text}</Text>
            </View>
        </Pressable>
    );
});

export default InputTimeField;