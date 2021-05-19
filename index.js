/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  let obj = await JSON.stringify(remoteMessage);
  let parseJsonData = JSON.parse(obj);
  if(parseJsonData.data !==undefined && parseJsonData.data.isActive==="false"){
    console.log("OOO")
    try {
      await AsyncStorage.removeItem("authToken");
      return true;
  }
  catch(exception) {
      return false;
  }
}
});

AppRegistry.registerComponent(appName, () => App);
