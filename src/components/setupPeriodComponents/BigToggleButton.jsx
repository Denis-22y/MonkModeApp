import { NativeWindStyleSheet } from 'nativewind';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, useColorScheme, Appearance } from 'react-native';

import Animated, { log } from 'react-native-reanimated';
import { interpolateColor } from 'react-native-reanimated';
import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const DURATION = 250;

const ENABLED_BACKGROUND = '#000000';
const DISABLED_BACKGROUND = '#FFFFFF00';
const ENABLED_TEXT = '#FFFFFF';
const DISABLED_TEXT = '#333333';
const BORDER = '#CBCBCB';

const ENABLED_BACKGROUND_DARK = '#FFFFFF';
const DISABLED_BACKGROUND_DARK = '#13131300';
const ENABLED_TEXT_DARK = '#000000';
const DISABLED_TEXT_DARK = '#EEEEEE';
const BORDER_DARK = '#484848';

function BigToggleButton({ style, text='Value', chosen, onPress=()=>{} }) {        
    const progress = useSharedValue(0);
    let colorScheme = useColorScheme();      

    const viewAnimatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(progress.value, [0, 1], [ DISABLED_BACKGROUND, ENABLED_BACKGROUND ]),
        borderColor: BORDER
      }
    }, [])

    const viewAnimatedStyleDark = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(progress.value, [0, 1], [ DISABLED_BACKGROUND_DARK, ENABLED_BACKGROUND_DARK]),
        borderColor: BORDER_DARK
      }
    }, [])

    const textAnimatedStyle = useAnimatedStyle(() => {
      return {
        color: interpolateColor(progress.value, [0, 1], [ DISABLED_TEXT, ENABLED_TEXT]),          
      }
    }, [])  
    
    const textAnimatedStyleDark = useAnimatedStyle(() => {
      return {
        color: interpolateColor(progress.value, [0, 1], [ DISABLED_TEXT_DARK, ENABLED_TEXT_DARK]),
      }
    }, [])    

    chosen === true
    ? progress.value = withTiming(1, {duration: DURATION})
    : progress.value = withTiming(0, {duration: DURATION})        

    return (
        <Pressable className={style} onPress={onPress}>
            <View className="h-12 w-[26vw]">
                <Animated.View style={[styles.view, colorScheme === 'light' ? viewAnimatedStyle : viewAnimatedStyleDark]}>
                    <Animated.Text style={[styles.text, colorScheme === 'light' ? textAnimatedStyle : textAnimatedStyleDark]}>{text}</Animated.Text>
                </Animated.View>
            </View>
        </Pressable>
    );
}

export default BigToggleButton;

const styles = StyleSheet.create({
    view: {
        borderWidth: 1,
        borderRadius: 50,  
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'             
    },
    text: {
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: '500',
        bottom: 1
    },
  });
