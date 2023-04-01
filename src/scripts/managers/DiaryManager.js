import * as FileSystem from 'expo-file-system';

class DiaryManager{
    daysList = []

    setDaysList(value){        
        this.daysList = value;
    }

    addPresentDay(){
        this.daysList.push(this.presentDayData);
    }

    get presentDayData(){
        let todayTime = new Date();
        todayTime.setHours(0);
        todayTime.setMinutes(0);
        todayTime.setSeconds(0);
        todayTime.setMilliseconds(0);
        todayTime = todayTime.getTime();

        const presentData = this.daysList.find(data => data.dateTime === todayTime);

        if(presentData === undefined){
            return {
                dateTime: todayTime,
                themes: []
            };
        } else {
            return presentData;
        }
    }

    get pastDays(){
        let todayTime = new Date();        
        todayTime.setHours(0);
        todayTime.setMinutes(0);
        todayTime.setSeconds(0);
        todayTime.setMilliseconds(0);
        todayTime = todayTime.getTime();       

        return this.daysList.filter(data => data.dateTime !== todayTime).sort((first, second) => second.dateTime - first.dateTime); 
    }

    setTheme(date, themeIndex, value){
        let dateIndex = this.daysList.findIndex(data => data.dateTime === date);     

        if(dateIndex === -1){
            this.addPresentDay();

            dateIndex = this.daysList.findIndex(data => data.dateTime === date);
        }        

        this.daysList[dateIndex].themes[themeIndex] = value;        
    }

    getThemeValue(date, themeIndex){
        let dateIndex = this.daysList.findIndex(data => data.dateTime === date);

        if(dateIndex === -1)
            return '';             

        return this.daysList[dateIndex].themes[themeIndex];
    }

    saveDaysList(){
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'DiaryData.json', JSON.stringify(this.daysList))
            .catch(err => console.log('Error with saving the DiaryData.json - oficial error: ' + err));
    }

}

export default new DiaryManager();