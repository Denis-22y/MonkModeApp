import { Pressable, ScrollView, Text, View } from 'react-native';

import Card from '../card/Card';
import Divider from '../card/Divider';
import DiaryDay from './DiaryDay';

import DiaryManager from '../../../scripts/managers/DiaryManager';
import { useNavigation } from '@react-navigation/native';

function DiaryCard( {style} ) {    
    const navigation = useNavigation();

    const handleTap = (date) => {
        if(typeof(date) !== 'number'){
            date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0); 
            
            date = date.getTime();
        }    

        navigation.navigate('Diary', date);
    }

    return (
        <Card style={style}>
            <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Diary</Text>            
            <Divider style="mt-1.5"/>   
            
            <View className="mt-5 mb-1" style={{overflow: 'hidden', borderTopLeftRadius: 23, borderTopRightRadius: 23, borderBottomLeftRadius: 23, borderBottomRightRadius: 23}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <DiaryDay isEmpty={DiaryManager.presentDayData.themes.length === 0} dateTime={DiaryManager.presentDayData.dateTime} onPress={handleTap}/>

                    {
                        DiaryManager.pastDays.map(data => {
                            return <DiaryDay dateTime={data.dateTime} onPress={() => handleTap(data.dateTime)} key={data.dateTime}/>
                        })
                    }
                </ScrollView>    
            </View>

            <Pressable className="mt-3 mb-1" hitSlop={8} onPress={handleTap}>
                <Text className="text-xl text-center font-regular text-grayTextButton dark:text-grayTextButtonDRK">Tap to write</Text>
            </Pressable>
        </Card>
    );
}

export default DiaryCard;