import { Pressable, View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function AbsoluteTextButton( {style, onPress, text='Button'} ) {
    const insets = useSafeAreaInsets();

    return (
        <View className="absolute mt-2 right-1" style={{paddingTop: insets.top + (Platform.OS === 'android' ? 2 : 0)}}>
            <Pressable className={style} onPress={onPress} hitSlop={30}>
                <Text className="text-xl font-medium text-grayTextButton dark:text-grayTextButtonDRK">{text}</Text>
            </Pressable>
        </View>
    );
}

export default AbsoluteTextButton;