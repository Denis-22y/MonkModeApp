import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';

class NotificationsPlanner{
    focusNotifications = [];

    setupStateNotification(title='Monk Mode app', body='Check the app!', timerSec=0, onlyInBackground=true, cancelOtherNotifications=false) {
        if(cancelOtherNotifications === true) 
            this.focusNotifications.map(id => Notifications.cancelScheduledNotificationAsync(id));

        Notifications.setNotificationHandler({ handleNotification: async () => ({shouldPlaySound: true, shouldShowAlert: true}) });                

        let notificationId;

        Notifications.scheduleNotificationAsync({
            content: { title: title, body: body },
            trigger: { seconds: timerSec }
        }).then(id => {notificationId = id; this.focusNotifications.push(id)});        

        if(onlyInBackground === true){
            setTimeout(() => {
                if(AppState.currentState === 'active')
                    Notifications.cancelScheduledNotificationAsync(notificationId);
            }, timerSec*1000 - 200);
        }
    }
    
}

export default new NotificationsPlanner();