/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Component} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {Alert, LogBox, ToastAndroid,Platform} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import RootNavigationContainer from './src/containers/rootContainer';
import {appConfig} from './src/settings/settings';
import {configureStore} from './src/store/index';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

class App extends Component {
  componentDidMount = () => {
    // SplashScreen.hide();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      let obj = await JSON.stringify(remoteMessage);
      let parseJsonData = JSON.parse(obj);
      ToastAndroid.show(
        `${parseJsonData.notification.title}\n${parseJsonData.notification.body}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
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
    if(Platform.OS === 'ios'){
    messaging()
      .getAPNSToken()
      .then(async (data) => {
        await AsyncStorage.setItem('token', data);
      });
    messaging().requestPermission();
    }else{
      messaging()
      .getToken()
      .then(async (data) => {
        await AsyncStorage.setItem('token', data);
      });
    messaging().requestPermission();
    }
  };

  render() {
    return (
      <Provider store={configureStore()}>
        <RootNavigationContainer></RootNavigationContainer>
      </Provider>
    );
  }
}

export default App;
