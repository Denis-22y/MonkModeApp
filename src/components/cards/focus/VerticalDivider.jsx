import { View } from "react-native";

function VerticalDivider( {style} ) {
    return (
        <View className={style}>
            <View className="w-[1] h-4 bg-border dark:bg-borderDRK mx-auto"/>
        </View>
    );
}

export default VerticalDivider;