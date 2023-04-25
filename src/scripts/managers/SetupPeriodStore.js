import { makeAutoObservable } from "mobx";
import NonNegotiableSuggestions from '../../assets/data/NonNegotiableSuggestions.json';
import * as FileSystem from 'expo-file-system';
import PlanningManager from "./PlanningManager";
import NonNegotiablesManager from "./NonNegotiablesManager";
import PeriodManager from "./PeriodManager";

const DAY_DURATION = 86400000;

class SetupPeriodStore {
	constructor() {
		makeAutoObservable(this, {});
	}	

//#region Preferences local management
    preferencesLocal = {
        isValid: false,
        goal: '',
        endTime: new Date().getTime() + DAY_DURATION*7,
        startTime: new Date().getTime()
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

    selectedLengthId = 0;    
    
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

    nonNegotiables = [];    

    addNonNegotiable(name){
        let namesList = [];
        this.nonNegotiables.map(object => namesList.push(object.name));

        if(namesList.indexOf(name) === -1 && this.nonNegotiables.length <= 9 && name !== '' && name !== undefined){
            this.nonNegotiables.push({ name: name, dateCompleted: null });
        }        
    }
    
    removeNonNegotiable(name){
        this.nonNegotiables = this.nonNegotiables.filter(object => object.name !== name);
    }

    getNonNegotiableSuggestion(){
        let freeSuggestions = NonNegotiableSuggestions;

        this.nonNegotiables.map(nonNegotiable => {
            freeSuggestions = freeSuggestions.filter(value => value !== nonNegotiable.name)
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
        PeriodManager.setPeriodPreferences(this.preferences);

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'NonNegotiablesData.json', JSON.stringify(this.nonNegotiables));
        NonNegotiablesManager.setNonNegotiables(this.nonNegotiables);    

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'PlanningData.json', '[]');
        PlanningManager.setTasks([]);
    }
}

export default new SetupPeriodStore();