import { TextInput, View, useColorScheme } from "react-native";

function LargeInput( {style, placeholder="Placeholder", onChange=()=>{}, onCommit=()=>{}, defaultValue, clearOnFocus=false, placeholderColor='#979797', placeholderColorDark='#444444'} ) {
    let colorScheme = useColorScheme();

    return (
        <View className={style}>
            <TextInput className="h-12 border-border dark:border-borderDRK text-headerText dark:text-headerTextDRK border rounded-3xl px-3.5" style={{fontSize: 20}} placeholderTextColor={colorScheme === 'light' ? placeholderColor : placeholderColorDark} placeholder={placeholder} selectTextOnFocus onChangeText={text => onChange(text.trim())} onEndEditing={e => onCommit(e.nativeEvent.text.trim())} defaultValue={defaultValue} clearTextOnFocus={clearOnFocus}/>
        </View>
    );
}

export default LargeInput;