import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getSegment} from '../../actions/index';
import {_styles} from '../../util/helpers/styles';
import DashboardMainScreen from './stacks/main';
import ViewPdfScreen from './stacks/viewPdf';
import {appConfig} from '../../settings/settings';
import {TransitionSpecs} from '@react-navigation/stack';

const DashboardStack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: {backgroundColor: appConfig.primaryColor},
  headerTintColor: appConfig.secondaryColor,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  // headerMode: 'float',
  // animation: 'fade',
};

const DashboardScreen = () => {
  return (
    <>
      <DashboardStack.Navigator screenOptions={stackScreenOptions}>
        <DashboardStack.Screen
          name={'dashboard-main'}
          options={{headerShown: false}}>
          {(props) => <DashboardMainScreen {...props} />}
        </DashboardStack.Screen>
        <DashboardStack.Screen
          name={'dashboard-viewpdf'}
          options={{headerShown: false}}>
          {(props) => <ViewPdfScreen {...props} />}
        </DashboardStack.Screen>
      </DashboardStack.Navigator>
    </>
  );
};

export default DashboardScreen;
