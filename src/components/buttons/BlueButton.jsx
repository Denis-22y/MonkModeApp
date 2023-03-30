import { Pressable, View, Text, Platform } from 'react-native';

const styleVariants = {
    false: 'text-contrastText font-semibold text-2xl text-center',
    true: 'text-contrastText font-medium text-xl text-center'
}

function BlueButton( {onPress=()=>{}, text='', children, textCompressed=false} ) {    
    return (
        <View className="absolute left-0 right-0 top-[95%]">            
            <Pressable onPress={onPress} className="self-center px-3 py-2 rounded-3xl bg-main dark:bg-mainDRK">
                <View className="w-48 h-0"/>                
                <Text className={styleVariants[textCompressed]}>{text}{children}</Text>
            </Pressable>
        </View>           
    );
}

export default BlueButton;