import { View, StyleSheet } from 'react-native';
import { forwardRef, useImperativeHandle } from 'react';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withRepeat, withSequence, withDelay } from 'react-native-reanimated';

function Warning({ style, text='Warning' }, ref) {
    const progress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: progress.value
        }
      }, [])

    useImperativeHandle(ref, () => ({
        flash() {            
            progress.value = withSequence(withTiming(1, {duration: 800}), withDelay(2500, withTiming(0, {duration: 800})));
        }
    }));

    return (
        <View className={style}>
            <Animated.Text className="text-lg text-center text-headerDescr dark:text-headerDescrDRK" style={animatedStyle}>{text}</Animated.Text>
        </View>
    );
}

export default forwardRef(Warning);