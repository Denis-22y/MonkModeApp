import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';

class NotificationsPlanner{
    focusNotifications = [];

    setupStateNotification(title='Monk Mode app', body='Check the app!', timerSec=0, onlyInBackground=true, cancelOtherNotifications=false) {     
        Notifications.setNotificationHandler({ handleNotification: async () => ({shouldPlaySound: true, shouldShowAlert: true}) });                

        if(cancelOtherNotifications === true) 
            this.canselStateNotifications();

        if(title === '')
            title = 'Monk Mode app';        
       
        Notifications.scheduleNotificationAsync({
            content: { title: title, body: body },
            trigger: { seconds: timerSec }
        }).then(id => {            
            this.focusNotifications.push(id)

            if(onlyInBackground === true){
                setTimeout(() => {
                    if(AppState.currentState === 'active')
                        Notifications.cancelScheduledNotificationAsync(id);
                }, timerSec*1000 - 200);
            }
        });            
    }
    
    canselStateNotifications(){
        this.focusNotifications.map(id => Notifications.cancelScheduledNotificationAsync(id));
    }

}

export default new NotificationsPlanner();