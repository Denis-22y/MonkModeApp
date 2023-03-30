class NonNegotiablesManagers{    
    nonNegotiables = [{name: 'name', isCompleted: false}, {name: 'name2', isCompleted: false}];

    setNonNegotiables(names){
        this.nonNegotiables = this.createNonNegotiableObjects(names);
    }

    createNonNegotiableObjects(names){
        let output = [];

        names.map(name => {
            output.push({
                name: name,
                isCompleted: false
            });
        });

        return output;
    }

    get haveNonNegotiables(){
        if(this.nonNegotiables.length <= 0)
            return false;
        else
            return true;
    }

    get activeNonNegotiables(){        
        return this.nonNegotiables.filter(object => object.isCompleted === false);
    }

    get completedNonNegotiables(){
        return this.nonNegotiables.filter(object => object.isCompleted === true);
    }

    switchNonNegotiable(name){
        const id = this.nonNegotiables.findIndex(object => object.name === name);

        this.nonNegotiables[id].isCompleted = !this.nonNegotiables[id].isCompleted;
    }
}

export default new NonNegotiablesManagers();