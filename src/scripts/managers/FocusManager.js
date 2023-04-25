import { makeAutoObservable } from "mobx";
import NotificationsPlanner from "../assistive/NotificationsPlanner";
import { StatusBar } from "react-native";
import { DarkTheme, ThemeProvider, useTheme } from "@react-navigation/native";

class FocusManager{
    constructor() {
		makeAutoObservable(this, {});
	}	

//#region State managing
    state = {
        stateId: 0, // 0 - stay, 1 - focus, 2 - relax
        endTime: 0
    }; 

    get stateId(){
        return this.state.stateId;
    }

    setState(stateId=0, endTime){        
        if(endTime === undefined)
            endTime = new Date().getTime() + (stateId === 1 ? this.focusDuration : this.relaxDuration) * 1000;

        this.state = {
            stateId: stateId,
            endTime: endTime
        }
    }
//#endregion

//#region {remainingTimeString} variable
    remainingTimeString = '25:00';

    setRemainingTimeString(value){
        this.remainingTimeString = value;
    }
//#endregion

//#region Manager's parameters
    taskTitle = 'Task';

    focusDuration = 0;// 1500
    relaxDuration = 0;// 300

    startup(title='Task', focusDuration=1500, relaxDuration=300, stateId=0){
        this.taskTitle = title;
        this.focusDuration = focusDuration;
        this.relaxDuration = relaxDuration;
        this.setState(stateId);        

        this.startIterations();
    }

    shutdown(){
        StatusBar.setHidden(false, 'fade');
        NotificationsPlanner.canselStateNotifications();
        this.stopIterations();
    }
//#endregion

//#region State starters
    startStay(){
        this.setState(0);
        this.updateRemainingTimeString();
    }

    startFocus(){
        this.setState(1);
        NotificationsPlanner.planStateNotification(this.taskTitle, 'Relax mode has started', this.focusDuration, true, false);
        NotificationsPlanner.planStateNotification(this.taskTitle, 'Relax mode is over. Open the app to continue', this.focusDuration+this.relaxDuration, true, false);        
        this.updateRemainingTimeString();
    }

    startRelax(){
        const currentTime = new Date().getTime();
        let relaxEndTime = currentTime + this.relaxDuration * 1000;

        if(this.stateId === 1 && this.state.endTime < currentTime) { // Adjusting the endTime if the focus ended in the background
            relaxEndTime = relaxEndTime - Math.abs(this.state.endTime - currentTime);
        } else {
            NotificationsPlanner.planStateNotification(this.taskTitle, 'Relax mode is over. Open the app to continue', this.relaxDuration, true, true);
        }

        if(relaxEndTime > 0){
            this.setState(2, relaxEndTime);
            this.updateRemainingTimeString();
        } else {
            this.startStay();            
        }   
    }
//#endregion

//#region Update interval managing
    intervalId = null;

    startIterations(intervalMs = 200){
        setInterval(() => {
            this.updateEverything();
        }, intervalMs);
    }

    stopIterations(){
        clearInterval(this.intervalId);    
    }

    updateEverything(){
        this.updateState();
        this.updateRemainingTimeString();
    }
    
    updateState(){
        switch(this.stateId){
            case 1:                
                StatusBar.setHidden(true, 'fade');                

                if(this.state.endTime <= new Date().getTime()) {
                    this.startRelax();                
                }
            
                break;
            case 2:
                StatusBar.setHidden(false, 'fade');

                if(this.state.endTime <= new Date().getTime()) {
                    this.startStay();                
                }
                
                break;
            }
    }
        
    updateRemainingTimeString(){                    
            const differenceInSeconds = Math.round((this.stateId === 0 ? this.focusDuration*1000 : this.state.endTime - new Date().getTime()) / 1000) + 0.9;            

            if(differenceInSeconds <= 0)
                this.setRemainingTimeString('00:00');
            
            const hours = Math.trunc(differenceInSeconds/3600);
            const minutes = Math.trunc((differenceInSeconds - hours*3600) / 60);
            const seconds = Math.trunc(differenceInSeconds - (minutes * 60) - (hours * 3600));
            
            this.setRemainingTimeString(`${hours < 10 && hours !== 0 ? '0' : ''}${hours !== 0 ? `${hours}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }
//#endregion
        
}

export default new FocusManager();