import { Pressable, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styleVariants = {
    false: 'text-contrastText font-semibold text-2xl text-center',
    true: 'text-contrastText font-medium text-xl text-center'
}

function BlueButton( {onPress=()=>{}, text='', textCompressed=false} ) {    
    const insets = useSafeAreaInsets();

    return (
        <View className="absolute left-0 right-0 bottom-6 sm:bottom-12" style={{paddingBottom: insets.bottom}}>            
            <Pressable onPress={onPress} className="self-center px-3 py-2 rounded-3xl bg-main dark:bg-mainDRK">
                <View className="w-48 h-0"/>                
                <Text className={styleVariants[textCompressed]}>{text}</Text>
            </Pressable>
        </View>           
    );
}

export default BlueButton;