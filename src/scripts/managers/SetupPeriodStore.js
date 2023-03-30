import { makeAutoObservable } from "mobx";
import NonNegotiableSuggestions from '../../assets/data/NonNegotiableSuggestions.json';
import * as FileSystem from 'expo-file-system';
import DiaryManager from "./DiaryManager";
import PlanningManager from "./PlanningManager";

const DAY_DURATION = 86400000;

class SetupPeriodStore {
	constructor() {
		makeAutoObservable(this, {});
	}	

//#region Preferences local management
    preferencesLocal = {
        isValid: false,
        goal: '',
        endTime: new Date().getTime() + DAY_DURATION*31,
        startTime: new Date().getTime(),
        nonNegotiables: []
    } 

    get preferences(){
        return this.preferencesLocal;
    }

    setPreferences(object){
        this.preferencesLocal = object;
    }
//#endregion

//#region Goal
    isGoalEmpty(){        
        return this.preferences.goal === '' ? true : false;
    }

    setGoal(text){
        this.preferencesLocal.goal = text;
    }
//#endregion

//#region EndTime
    setEndTime(newTime){        
        this.preferencesLocal.endTime = newTime;        
    }

    selectedLengthId = 1;    
    
    isChosen(id){        
        return this.selectedLengthId === id;
    }

    setDate(id){        
        this.selectedLengthId = id;
        
        let todayTime = new Date();        
        todayTime.setHours(0);
        todayTime.setMinutes(0);
        todayTime.setSeconds(0);
        todayTime.setMilliseconds(0);
        todayTime = todayTime.getTime();

        switch(id){
            case 0: this.setEndTime(todayTime + DAY_DURATION*7); break;
            case 1: this.setEndTime(todayTime + DAY_DURATION*31); break;
            case 2: this.setEndTime(todayTime + DAY_DURATION*90); break;
        }
    }   
//#endregion

//#region NonNegotiables
    addNonNegotiable(name){
        if(this.preferences.nonNegotiables.indexOf(name) === -1 && this.preferences.nonNegotiables.length <= 9 && name !== ''){
            this.preferencesLocal.nonNegotiables.push(name);
        }        
    }
    
    removeNonNegotiable(name){
        this.preferencesLocal.nonNegotiables = this.preferences.nonNegotiables.filter(value => value !== name);
    }

    getNonNegotiableSuggestion(){
        let freeSuggestions = NonNegotiableSuggestions;

        this.preferences.nonNegotiables.map(nonNegotiable => {
            freeSuggestions = freeSuggestions.filter(value => value !== nonNegotiable)
        })

        if(freeSuggestions.length === 0){            
            return null;
        }

        return(freeSuggestions[Math.floor(Math.random() * (freeSuggestions.length))]);
    }
//#endregion

    launchMonkModePeriod(){        
        let todayTime = new Date();        
        todayTime.setHours(0);
        todayTime.setMinutes(0);
        todayTime.setSeconds(0);
        todayTime.setMilliseconds(0);
        todayTime = todayTime.getTime();
        
        this.preferencesLocal.startTime = todayTime;     
        this.preferencesLocal.isValid = true;   

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'PeriodPreferences.json', JSON.stringify(this.preferences));

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'DiaryData.json', '');
        DiaryManager.setDaysList([]);        

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'PlanningData.json', '');
        PlanningManager.setTasks([]);
    }
}

export default new SetupPeriodStore();