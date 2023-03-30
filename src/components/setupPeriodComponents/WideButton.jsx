import { View, Text, Pressable } from 'react-native';

function WideButton( {style='w-full', onPress=()=>{}, text='Press me'} ) {    
    return (
        <Pressable className={style} onPress={onPress}>
            <View className="h-12 bg-continueButton dark:bg-continueButtonDRK rounded-3xl">
                <Text className="text-contrastText dark:text-contrastTextDRK m-auto text-center font-semibold text-[24px]">{text}</Text>
            </View>
        </Pressable>
    );
}

export default WideButton;