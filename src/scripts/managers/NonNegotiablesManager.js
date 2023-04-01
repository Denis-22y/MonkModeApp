import * as FileSystem from 'expo-file-system';

class NonNegotiablesManagers {    
    nonNegotiables = [];

    todayDate = new Date().getDate();                    

    setNonNegotiables(list){
        this.nonNegotiables = list;
    }

    get haveNonNegotiables(){
        if(this.nonNegotiables.length <= 0)
            return false;
        else
            return true;
    }

    get activeNonNegotiables(){        
        return this.nonNegotiables.filter(object => object.dateCompleted !== this.todayDate);
    }

    get completedNonNegotiables(){
        return this.nonNegotiables.filter(object => object.dateCompleted === this.todayDate);
    }

    switchNonNegotiable(name){
        const id = this.nonNegotiables.findIndex(object => object.name === name);        

        if(this.nonNegotiables[id].dateCompleted === this.todayDate)
            this.nonNegotiables[id].dateCompleted = null;
        else 
            this.nonNegotiables[id].dateCompleted = this.todayDate;
                
        this.saveNonNegotiables();
    }

    saveNonNegotiables(){
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'NonNegotiablesData.json', JSON.stringify(this.nonNegotiables))
            .catch(err => console.log('Error with saving the NonNegotiablesData.json - oficial error: ' + err));
    }
}

export default new NonNegotiablesManagers();