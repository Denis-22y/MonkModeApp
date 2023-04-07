import { View, Text, Pressable } from "react-native";

import Card from "../card/Card";
import Divider from "../card/Divider";
import TaskText from "./TaskText";
import VerticalDivider from "./VerticalDivider";

import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import PlanningManager from "../../../scripts/managers/PlanningManager";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const mainTasksElement = () => {
    const navigation = useNavigation();

    const tasksCount = PlanningManager.tasksForToday.length;    

    if(tasksCount <= 0 || PlanningManager.tasksForToday === undefined)
        return <Pressable className="p-2" hitSlop={10} onPress={() => {navigation.navigate('Planning', [false])}}>
            <Text className="text-xl text-center text-grayTextButton dark:text-grayTextButtonDRK">Tap to plan</Text>
        </Pressable>

    return <View>
        <TaskText isBig={true} data={PlanningManager.tasksForToday[0]}/>        
        {
            tasksCount >= 2 
            ? <>
                <VerticalDivider style="mt-1"/>
                <TaskText data={PlanningManager.tasksForToday[1]}/>                
            </> : <></>
        }
    </View>
}

const otherTasksElement = (shows) => {
    const tasksCount = PlanningManager.tasksForToday.length;

    if(tasksCount <= 2 || PlanningManager.tasksForToday === undefined || shows === false)
        return <></>

    return <Animated.View className="mt-5" entering={FadeInUp.delay(40).duration(300)} exiting={FadeOutUp.duration(100)}>
        {
            PlanningManager.tasksForToday.slice(2).map((task, index) => {return <View key={index}>
                <TaskText data={task}/>
                {
                    tasksCount-3 === index ? <></> : <VerticalDivider/> 
                }
            </View>})
        }
    </Animated.View>
}

function TaskCard( {style} ) { 
    const [opened, setOpened] = useState(false);        

    return (
        <View className={style}>
            <Card>
                <Pressable onPress={() => setOpened(!opened)}>
                    <Text className="text-3xl font-semibold text-center text-headerText dark:text-headerTextDRK">Task</Text>
                </Pressable>
                <Divider style="mt-1.5"/>   
                <View className="mt-3">
                    {mainTasksElement()}                                 
                    {otherTasksElement(opened)}                
                </View>    
            </Card>
        </View>
    );
}

export default TaskCard;