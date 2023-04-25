import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function WideButton( {style='w-full mb-[15%] md:mb-[10%]', onPress=()=>{}, text='Press me'} ) {    
    const insets = useSafeAreaInsets();

    return (
        <Pressable className={style} onPress={onPress} style={{paddingBottom: Platform.OS === 'android' ? insets.bottom : 0}}>
            <View className="h-12 bg-continueButton dark:bg-continueButtonDRK rounded-3xl">
                <Text className="text-contrastText dark:text-contrastTextDRK m-auto text-center font-semibold text-[24px]">{text}</Text>
            </View>
        </Pressable>
    );
}

export default WideButton;