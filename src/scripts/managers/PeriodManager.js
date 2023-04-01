import NonNegotiablesManager from "./NonNegotiablesManager";

class PeriodManager{
    periodPreferences = {
        isValid: false,
        goal: 'goal',
        endTime: 1,
        startTime: 0
    }

    setPeriodPreferences(value){
        this.periodPreferences = value;        
    }

    get isValid(){
        return this.periodPreferences.isValid;
    }

    get goal(){
        return this.periodPreferences.goal;
    } 

    get endTime(){
        return this.periodPreferences.endTime;
    }

    get startTime(){
        return this.periodPreferences.startTime;
    }

    get remainingDaysString(){        
        const differenceInMillisecnods = this.endTime - new Date().getTime();
        const differenceInDays = Math.ceil(differenceInMillisecnods / (1000 * 3600 * 24));        

        if(differenceInDays === 1){
            return 'Last day';
        } 

        return `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} left`;
    }

    setIsValid(value=false){
        this.periodPreferences.isValid = value;
    }
}

export default new PeriodManager();