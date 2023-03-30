import { TextInput, View } from 'react-native';

function InputField( {placeholder='Type...', style, value='', onChange=()=>{}, onCommit=()=>{}} ) {
    return (
        <View className={style}>
            <TextInput className="bg-inputBackground dark:bg-inputBackgroundDRK rounded-3xl px-3.5 h-10 text-headerText dark:text-headerTextDRK" style={{fontSize: 20}} placeholder={placeholder} placeholderTextColor="#807F85" selectTextOnFocus value={value} onChangeText={text => onChange(text)} onEndEditing={e => onCommit(e.nativeEvent.text.trim())}/>
        </View>
    );
}

export default InputField;