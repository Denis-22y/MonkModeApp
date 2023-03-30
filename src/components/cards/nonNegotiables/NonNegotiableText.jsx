import { Pressable, Text } from 'react-native';

import Animated, { FadeIn, FadeOutDown, FadeOutUp, Layout } from 'react-native-reanimated';

import NonNegotiablesManager from '../../../scripts/managers/NonNegotiablesManager';

const styleVariants = {
    true: 'text-xl text-center font-medium text-headerDescr dark:text-headerDescrDRK line-through',
    false: 'text-xl text-center font-medium text-headerText dark:text-headerTextDRK'
}

function NonNegotiableText( {name='This is a bag, please report', isCompleted=false, parentOnPressActions=()=>{}} ) {
    function handlePress() {
        NonNegotiablesManager.switchNonNegotiable(name);

        parentOnPressActions();
    }

    return (
        <Animated.View entering={FadeIn.delay(50)} exiting={isCompleted ? FadeOutUp : FadeOutDown} layout={Layout.delay(50)}>
            <Pressable className="py-1.5" onPress={handlePress}>
                <Text className={styleVariants[isCompleted]}>{name}</Text>
            </Pressable>
        </Animated.View>
    );
}

export default NonNegotiableText;