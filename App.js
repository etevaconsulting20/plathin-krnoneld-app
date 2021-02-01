/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Component} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {Alert, LogBox} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import RootNavigationContainer from './src/containers/rootContainer';
import {appConfig} from './src/settings/settings';
import {configureStore} from './src/store/index';
import {Provider} from 'react-redux';

class App extends Component {
  async componentDidMount() {
    //we check if user has granted permission to receive push notifications.
    // this.checkPermission();
    // Register all listener for notification
    // this.createNotificationListeners();
    // SplashScreen.hide()
    // LogBox.ignoreAllLogs();
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <RootNavigationContainer></RootNavigationContainer>
      </Provider>
    );
  }
}

export default App;
