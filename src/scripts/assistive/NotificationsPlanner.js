import * as Notifications from 'expo-notifications';
import { Alert, AppState, Platform } from 'react-native';

class NotificationsPlanner{
    stateNotifications = [];
    taskNotifications = [];

    planStateNotification(title='Monk Mode app', body='Check the app!', timerSec=0, onlyInBackground=true, cancelOtherNotifications=false) {     
        if(cancelOtherNotifications === true) 
            this.canselStateNotifications();

        if(title === '')
            title = 'Monk Mode app';        
       
        Notifications.scheduleNotificationAsync({
            content: { title: title, body: body, sound: true },
            trigger: { seconds: timerSec }
        }).then(id => {            
            this.stateNotifications.push(id)

            if(onlyInBackground === true){
                setTimeout(() => {
                    if(AppState.currentState === 'active')
                        Notifications.cancelScheduledNotificationAsync(id);
                }, timerSec*1000 - 200);
            }
        });            
    }
    
    canselStateNotifications(){
        this.stateNotifications.map(id => Notifications.cancelScheduledNotificationAsync(id));
    }

    planTaskNotifications(tasksList=[{name: '', startTime: 0, id: 0}], beforeSec=0){
        this.taskNotifications.map(id => Notifications.cancelScheduledNotificationAsync(id));
        this.taskNotifications = [];

        tasksList.map(task => {
            const title = task.name.length === 0 ? 'Monk Mode' : task.name;
            const date = new Date(task.startTime);
            const timeString = `${date.getHours()}:${date.getMinutes() <= 9 ? '0' : ''}${date.getMinutes()}`;
            const triggerSeconds = Math.abs(new Date().getTime() - task.startTime)/1000 - beforeSec;

            this.taskNotifications[task.id] = Notifications.scheduleNotificationAsync({
                content: {title: title, body: `The task is planned for ${timeString}`, sound: true},
                trigger: {seconds: triggerSeconds}
            })
        })        
    }

    setupNotifications(){
        Notifications.getPermissionsAsync().then(permissionStatus => {
            if(permissionStatus.granted === true){
                Notifications.setNotificationHandler({ handleNotification: async () => ({shouldPlaySound: true, shouldShowAlert: true}) });     
            } else {
                if(permissionStatus.canAskAgain === true){
                    Notifications.requestPermissionsAsync({ios: {allowSound: true, allowAlert: true}})
                    .then(permissionStatus => {
                        if(permissionStatus.granted === true)
                            Notifications.setNotificationHandler({ handleNotification: async () => ({shouldPlaySound: true, shouldShowAlert: true}) });     
                    })
                } else {
                    if(Platform.OS === 'ios')
                        Alert.alert('Enable notifications', `To enable notifications go to${'\n'}Settings - Monk Mode - Notifications - Allow Notifications`);
                    else
                        Alert.alert('Enable notifications', `To enable notifications go to${'\n'}Settings - Apps - Monk Mode - Notifications - Allow notifications`);

                }
                
            }
        });
    }
}

export default new NotificationsPlanner();