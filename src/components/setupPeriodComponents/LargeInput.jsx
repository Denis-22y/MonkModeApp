import { TextInput, View, useColorScheme } from "react-native";

function LargeInput( {style, placeholder="Placeholder", onChange=()=>{}, onCommit=()=>{}, defaultValue, clearOnFocus=false, placeholderColor='#979797', placeholderColorDark='#444444'} ) {
    let colorScheme = useColorScheme();

    function handleChange(newText){
        onChange(newText);
    }

    function handleCommit(newText){
        onCommit(newText);
    }

    return (
        <View className={style}>
            <TextInput 
            className="h-12 border-border dark:border-borderDRK text-headerText dark:text-headerTextDRK border rounded-3xl px-3.5" 
            style={{fontSize: 20}} 
            placeholderTextColor={colorScheme === 'light' ? placeholderColor : placeholderColorDark} 
            placeholder={placeholder} 
            selectTextOnFocus 
            onChangeText={text => handleChange(text)} 
            onEndEditing={e => handleCommit(e.nativeEvent.text)} 
            defaultValue={defaultValue} 
            clearTextOnFocus={clearOnFocus}/>
        </View>
    );
}

export default LargeInput;