import { Children } from "react";
import { View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

function Card( {style, children} ) {
    return (
        <Animated.View className="w-full bg-background dark:bg-backgroundDRK rounded-2xl p-3 mt-5" layout={Layout}>        
            {children}        
        </Animated.View>
    );
}

export default Card;