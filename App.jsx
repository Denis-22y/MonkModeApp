import Loading from './src/screens/Loading';

import Main from './src/screens/Main';
import Focus from './src/screens/Focus';
import Diary from './src/screens/Diary';
import Planning from './src/screens/Planning';

import EnteringDescription from './src/screens/setupPeriodScreens/Entering-Description';
import EnteringWarning from './src/screens/setupPeriodScreens/Entering-Warning';
import EnteringSetupGoal from './src/screens/setupPeriodScreens/Entering-SetupGoal';
import EnteringSetupLength from './src/screens/setupPeriodScreens/Entering-SetupLength';
import EnteringSetupNonNegotiables from './src/screens/setupPeriodScreens/Entering-SetupNonNegotiables';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator>  
        <Stack.Screen name="Loading" component={Loading} options={{headerShown: false, animation: 'fade', gestureEnabled: false}} />

        <Stack.Screen name="Main" component={Main} options={{headerShown: false, animation: 'fade', gestureEnabled: false}}/>
        <Stack.Screen name="Focus" component={Focus} options={{headerShown: false, animation: 'slide_from_bottom'}}/>
        <Stack.Screen name="Diary" component={Diary} options={{headerShown: false, animation: 'slide_from_bottom'}}/>
        <Stack.Screen name="Planning" component={Planning} options={{headerShown: false, animation: 'slide_from_bottom'}}/>

        <Stack.Screen name="Entering-Description" component={EnteringDescription} options={{headerShown: false, animation: 'fade', gestureEnabled: false}}/>                   
        <Stack.Screen name="Entering-Warning" component={EnteringWarning} options={{headerShown: false, animation: 'slide_from_right'}}/>                 
        <Stack.Screen name="Entering-SetupGoal" component={EnteringSetupGoal} options={{headerShown: false, animation: 'slide_from_right'}}/>                 
        <Stack.Screen name="Entering-SetupLength" component={EnteringSetupLength} options={{headerShown: false, animation: 'slide_from_right'}}/>                 
        <Stack.Screen name="Entering-SetupNonNegotiables" component={EnteringSetupNonNegotiables} options={{headerShown: false, animation: 'slide_from_right'}}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
}