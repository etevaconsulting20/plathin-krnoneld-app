import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getSegment} from '../../actions/index';
import {_styles} from '../../util/helpers/styles';
import NotificationMainScreen from './stacks/main';
import Details from './stacks/details';
import {appConfig} from '../../settings/settings';

const NotificatioStack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: {backgroundColor: appConfig.primaryColor},
  headerTintColor: appConfig.secondaryColor,
};

const NotificationsScreen = () => {
  return (
    <>
      <NotificatioStack.Navigator screenOptions={stackScreenOptions}>
        <NotificatioStack.Screen
          name={'dashboard-main'}
          options={{headerShown: false}}>
          {(props) => <NotificationMainScreen {...props} />}
        </NotificatioStack.Screen>
        <NotificatioStack.Screen
          name={'dashboard-details'}
          options={{headerShown: false}}>
          {(props) => <Details {...props} />}
        </NotificatioStack.Screen>
      </NotificatioStack.Navigator>
    </>
  );
};

export default NotificationsScreen;
