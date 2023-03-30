import { View, Text, Pressable } from 'react-native';
import Animated, { SlideInRight, Layout, SlideOutRight } from 'react-native-reanimated';
import SetupPeriodStore from '../../scripts/managers/SetupPeriodStore';

const DURATION = 250;

function NonNegotiableView({ name='No weed', onPress=()=>{} }) {        

    const handlePress = () => {        
        SetupPeriodStore.removeNonNegotiable(name);
    }

    return (
        <Animated.View entering={SlideInRight.duration(DURATION)} exiting={SlideOutRight.duration(DURATION)} layout={Layout.duration(DURATION)} >
            <Pressable onPress={handlePress} className="p-2">
                <View className="bg-islandBackground dark:bg-islandBackgroundDRK py-2.5 px-3 rounded-3xl self-start">
                    <Text className="text-xl font-medium text-center text-contrastText dark:text-contrastTextDRK">{name}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
}

export default NonNegotiableView;