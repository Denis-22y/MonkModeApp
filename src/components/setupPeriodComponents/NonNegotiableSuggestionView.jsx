import { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

import plusCircleLight from '../../assets/images/plus.circle.Light.png';
import plusCircleDark from '../../assets/images/plus.circle.Dark.png';

import SetupPeriodStore from '../../scripts/managers/SetupPeriodStore';

const DURATION = 200;

function NonNegotiableSuggestionView() {
    let colorScheme = useColorScheme();  
    const [name, setName] = useState('No weed');

    useEffect(() => {
        generateSuggestionName();
    }, [])

    const handlePress = () => {                
        SetupPeriodStore.addNonNegotiable(name);

        generateSuggestionName();
    }

    const generateSuggestionName = () => {
        setName(SetupPeriodStore.getNonNegotiableSuggestion());      
    }

    return (
        <Animated.View entering={FadeIn.duration(DURATION)} exiting={FadeOut.duration(DURATION)} layout={Layout.duration(DURATION)}>
            <Pressable onPress={handlePress} className="p-2">
                <View className="bg-suggestionIslandBackground dark:bg-suggestionIslandBackgroundDRK py-2.5 px-3 rounded-3xl self-start flex flex-row">
                    <Text className="text-contrastText dark:text-[#B5B5B5] font-medium text-xl text-center">{name}</Text>
                    <Image className="w-6 h-6 my-auto ml-2 " source={colorScheme === 'light' ? plusCircleLight : plusCircleDark}/>
                </View>
            </Pressable>
        </Animated.View>
    );
}

export default NonNegotiableSuggestionView;