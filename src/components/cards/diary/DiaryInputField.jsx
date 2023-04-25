import React, { useEffect } from 'react';
import { Keyboard, Platform, TextInput, View, useColorScheme } from 'react-native';

function DiaryInputField({style, placeholder='Write here...', initialValue='', onCommit=()=>{}}) {
    let text = '';

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => onCommit(text));
    }, []);

    return (
        <View className={style}>
            <View className="mb-6 bg-inputBackground dark:bg-inputBackgroundDRK rounded-2xl">
                <TextInput 
                    className={Platform.OS === 'android' ? "text-headerText dark:text-headerTextDRK px-3 mt-2 pb-2 text-lg" : "text-headerText dark:text-headerTextDRK px-2.5 mx-0.5 pb-2.5 text-lg"} 
                    style={{minHeight: 128, maxHeight: 250}}  
                    multiline 
                    textAlignVertical='top' 
                    textAlign='left' 
                    placeholder={placeholder} 
                    placeholderTextColor={useColorScheme() === 'light' ? '#807F85' : '#807F85'} 
                    defaultValue={initialValue} 
                    onChangeText={inputText => text = inputText}/>        
            </View>
        </View>
    );
}

export default DiaryInputField;