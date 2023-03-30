import {BackHandler} from 'react-native';

class BackButtonHandler{
  backHandlerEvent = null;

  handleAndroidBackButton(callback) {    
    backHandlerEvent = BackHandler.addEventListener('hardwareBackPress', () => {
      callback();
      return true;
    });
  };
  
  removeAndroidBackButtonHandler() {  
    backHandlerEvent.remove();
  }
}


export default new BackButtonHandler();