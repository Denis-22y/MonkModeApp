import { Pressable, View, Text } from 'react-native';

import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp, Layout } from 'react-native-reanimated';

import PlanningManager from '../../../scripts/managers/PlanningManager';

function TaskIsland({ data = { name: '', details: '', startTime: 0, focusDuration: 1500, id: -1 } }) {

    function getName(){
        if(data.name === '' || data.name === undefined)
            return 'Untilted';
        else
            return data.name;
    }

    function getStartTimeString() {
        const hours = new Date(data.startTime).getHours();
        const minutes = new Date(data.startTime).getMinutes();

        return `${hours <= 9 ? '0' : ''}${hours}:${minutes <= 9 ? '0' : ''}${minutes}`
    }

    function handleClick() {
        PlanningManager.setSelectedTaskIndexById(data.id);
    }

    return (
        <Animated.View className="bg-islandBackground dark:bg-tasksBackgroundDRK rounded-3xl mb-2" entering={FadeInDown} exiting={FadeOutDown} layout={Layout.duration(150)}>
            <Pressable className="p-2 px-3.5 w-full flex flex-row" onPress={handleClick}>
                <View className="my-auto w-5/6">
                    <Text className="text-contrastText font-medium text-xl">{getName()}</Text>
                    {
                        data.details.length !== 0
                            ? <Animated.Text className="text-headerDescr dark:text-headerDescrDRK text-base" entering={FadeInUp.duration(150)} exiting={FadeOutUp.duration(150)}>{data.details}</Animated.Text>
                            : <></>
                    }
                </View>

                <Text className="text-contrastText text-xl text-right ml-auto mb-auto">{getStartTimeString()}</Text>
            </Pressable>
        </Animated.View>
    );
}

export default TaskIsland;