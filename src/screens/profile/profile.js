import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {changeLanguage} from '../../actions/index';
import {_styles} from '../../util/helpers/styles';
import SettingsMainScreen from './stacks/main';
import SettingsLanguageScreen from './stacks/language';
import {appConfig} from '../../settings/settings';

const ProfileStack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: {backgroundColor: appConfig.primaryColor},
  headerTintColor: appConfig.secondaryColor,
};

const ProfileScreen = (props) => {
  onValueChange = (itemValue, itemIndex) => {
    props.changeLanguage(itemValue);
  };
  const {locale} = props.userSetting;
  return (
    <ProfileStack.Navigator screenOptions={stackScreenOptions}>
      <ProfileStack.Screen name={'profile-main'} options={{headerShown: false}}>
        {(props) => <SettingsMainScreen {...props} locale={locale} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen name={'profile-language'}>
        {(props) => <SettingsLanguageScreen {...props} locale={locale} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

const mapStateTopProps = ({settings}) => {
  return {...settings};
};
export default connect(mapStateTopProps, {
  changeLanguage,
})(ProfileScreen);
