import { View, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

function TextButton( {style='', textViewStyle='', onPress=()=>{}, text='Press me'} ) {
    return (
        <Pressable className={style} onPress={onPress} hitSlop={30}>
            <View className={textViewStyle}>
                <Animated.Text className="text-grayTextButton dark:text-grayTextButtonDRK font-medium text-xl" entering={FadeIn.duration(400)} exiting={FadeOut.duration(400)}>{text}</Animated.Text>            
            </View>            
        </Pressable>
    );
}

export default TextButton;