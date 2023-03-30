import { View } from "react-native";

function Divider( {style} ) {
    return (
        <View className={style}>
            <View className="w-full h-[0.5] bg-border dark:bg-borderDRK"/>
        </View>
    );
}

export default Divider;