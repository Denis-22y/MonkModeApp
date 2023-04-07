import * as FileSystem from 'expo-file-system';
import { makeAutoObservable } from 'mobx';

class PlanningManager {
    constructor() {
		makeAutoObservable(this, {}, {deep: true});
	}	

    tasksList = [{
        name: 'Real name',
        details: 'Not real details',
        startTime: 0,
        focusDuration: 1500,
        id: 0
    }];

    setTasks(value) {    
        this.tasksList = value;          
    }

    get tasksListSortedByTime() {
        return this.tasksList.sort((first, second) => first.startTime - second.startTime);
    }

    get tasksForToday(){
        let todayTime = new Date();        
        todayTime.setHours(0);
        todayTime.setMinutes(0);
        todayTime.setSeconds(0);
        todayTime.setMilliseconds(0);
        todayTime = todayTime.getTime();

        const tasks = this.tasksList
            .filter(data => {
                const date = new Date(data.startTime);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);

                return date.getTime() === todayTime;
            })
            .sort((first, second) => first.startTime - second.startTime);  

        return tasks;
    }

    get tasksForTomorrow(){        
        let tomorrowTime = new Date();        
        tomorrowTime.setHours(0);
        tomorrowTime.setMinutes(0);
        tomorrowTime.setSeconds(0);
        tomorrowTime.setMilliseconds(0);
        tomorrowTime = tomorrowTime.getTime() + 86400000;

        const tasks = this.tasksList
        .filter(data => {
            const date = new Date(data.startTime);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            return date.getTime() === tomorrowTime;
        })
        .sort((first, second) => first.startTime - second.startTime);
        
        return tasks;
    }

    getAvailableStartTime() {        
        let lastTask;

        if(this.isTommorow === true){
            lastTask = this.tasksForTomorrow[this.tasksForTomorrow.length-1];
        } else {
            lastTask = this.tasksForToday[this.tasksForToday.length-1];
        }

        if(lastTask !== undefined){
            return lastTask.startTime + lastTask.focusDuration*1000 + 300*1000;
        } else {            
            const date = new Date();
            date.setHours(7);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            if(this.isTommorow === true)
                return date.getTime() + 86400000;
            else
                return date.getTime();
        }
    }

    ///#region Planning
        isTommorow = false;

        setIsTomorrow(value){
            this.isTommorow = value;
        }

        selectedTaskIndex = -1;

        setSelectedTaskIndex(index){
            this.selectedTaskIndex = index;
        }

        setSelectedTaskIndexById(id){
            this.setSelectedTaskIndex(this.tasksList.findIndex(data => data.id === id));
        }

        get selectedTask(){
            if(this.selectedTaskIndex === -1 || this.tasksList[this.selectedTaskIndex] === undefined){
                return this.tempValues;                
            } else {
                return this.tasksList[this.selectedTaskIndex];
            }                
        }

        tempValues = {
            name: '',
            details: '',
            startTime: 0,
            focusDuration: 1500,
            id: new Date().getTime()
        }        

        resetTempValues(){
            tempValues = {
                name: '',
                details: '',
                startTime: 0,
                focusDuration: 1500,
                id: new Date().getTime()
            }   
        }

        addTask(){            
            let tempTasksList = this.tasksList;

            let startTime = this.getAvailableStartTime();

            if(new Date(startTime).getDate() !== new Date().getDate() && this.isTommorow === false)
                startTime -= 86400000;

            let newTask = {
                name: '',
                details: '',
                startTime: startTime,
                focusDuration: 1500,
                id: new Date().getTime()
            }

            if(this.selectedTaskIndex === -1){ // It means there are no tasks
                this.tempValues.startTime = this.getAvailableStartTime();
                newTask = this.tempValues;
            }
        
            tempTasksList.push(newTask);

            this.setSelectedTaskIndex(tempTasksList.length - 1);

            this.setTasks(tempTasksList);
        }

        deleteTask(id=null) {  
            if(id === null){
                if(this.selectedTaskIndex === -1)
                    return;
                else
                    id = this.tasksList[this.selectedTaskIndex].id;
            }
            
            this.setTasks(this.tasksList.filter(task => task.id !== id));
    
            if(this.isTommorow){
                if(this.tasksForTomorrow.length <= 0)
                    this.setSelectedTaskIndex(-1);
                else
                    this.setSelectedTaskIndexById(this.tasksForTomorrow[this.tasksForTomorrow.length - 1].id);

            } else {

                if(this.tasksForToday.length <= 0)
                    this.setSelectedTaskIndex(-1);
                else
                    this.setSelectedTaskIndexById(this.tasksForToday[this.tasksForToday.length - 1].id);
            }

            this.saveTasksList();
        }

        setName(value){
            this.selectedTask.name = value;
        }

        get name(){
            return this.selectedTask.name;
        }

        setDetails(value){
            this.selectedTask.details = value;
        }

        get details(){
            return this.selectedTask.details;
        }

        setStartTime(value){
            this.selectedTask.startTime = value;
        }

        get startTime(){
            return this.selectedTask.startTime;
        }

        setFocusDuration(value){
            if(value === 0)
                value += 5;
                
            this.selectedTask.focusDuration = value;
        }

        get focusDuration(){
            return this.selectedTask.focusDuration;
        }
    //#endregion

    saveTasksList() {        
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'PlanningData.json', JSON.stringify(this.tasksList))
            .catch(err => console.log('Error with saving PlanningData.json - oficial error: ' + err));
    }

}

export default new PlanningManager();