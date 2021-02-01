import React, {Component, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Text,
  View,
  Button,
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {appConfig} from '../settings/settings';
import DashboardScreen from '../screens/dashboard/dashboard';
import NotificationsScreen from '../screens/notification/notifications';
import SettingScreen from '../screens/settings/settings';
import ProfileScreen from '../screens/profile/profile';
import {AsyncStorage} from '../util/helpers/helpers';
import {size} from 'lodash';

const Tab = createBottomTabNavigator();

function MainApp(props) {
  const tabNavigatorData = [
    {
      name: 'dashboard',
      component: DashboardScreen,
      label: 'tabs-dashboard',
      iconName: 'dashboard',
      iconType: 'MaterialCommunityIcons',
      iconColor: appConfig.textColor,
    },
    {
      name: 'notifications',
      component: NotificationsScreen,
      label: 'tabs-notification',
      solid: true,
      iconName: 'notifications',
      iconType: 'MaterialCommunityIcons',
      iconColor: appConfig.textColor,
    },
    {
      name: 'Profile',
      component: ProfileScreen,
      label: 'tabs-profile',
      solid: true,
      iconName: 'person',
      iconType: 'MaterialCommunityIcons',
      iconColor: appConfig.textColor,
    },
  ];

  const customTabBarOption = {
    keyboardHidesTabBar: true,
    style: {
      position: 'absolute',
    },
    activeTintColor: 'black',
    labelStyle: {
      fontFamily: 'Poppins-Medium',
      fontSize: 12,
      letterSpacing: 0.09,
    },
    inactiveTintColor: 'black',
    style: {
      backgroundColor: appConfig.secondaryColor,
    },
  };
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            marginRight: 10,
            display: 'flex',
            flexDirection: 'row',
            width: 40,
            justifyContent: 'space-between',
          }}>
          {/* <TouchableOpacity onPress={openModal}>
            <Icon name="user" type="font-awesome" color="white"></Icon>
            <Text style={style.textBold}>{I18n.t('settings-signout')}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={openModal}>
            <Icon name="sign-out" type="font-awesome" color="white"></Icon>
            {/* <Text style={style.textBold}>{I18n.t('settings-signout')}</Text> */}
          </TouchableOpacity>

          {/* <Icon size={30} type="font-awesome" name="sign-out" onPress={openModal} /> */}
        </View>
      ),
    });
  }, [props.navigation]);
  const route = useRoute();

  useEffect(() => {
    console.log(route.name, 'routname');
    if (props.authError) {
      if (route.name != 'login') {
        props.navigation.dispatch(StackActions.replace('login'));
      }
    }
  }, [props.authError]);

  const openModal = () => {
    props.navigation.navigate('modal', {
      type: 'delete-confirmation',
    });
  };
  return (
    <>
      <Tab.Navigator
        tabBarOptions={customTabBarOption}
        initialRouteName="dashboard">
        {tabNavigatorData.map((tabItem) => (
          <Tab.Screen
            key={`${'tab-screen-' + tabItem.name}`}
            name={tabItem.name}
            component={tabItem.component}
            options={{
              tabBarLabel: I18n.t(tabItem.label),

              tabBarIcon: ({tintColor, focused}) => (
                <Icon
                  size={tabItem.size ? tabItem.size : 25}
                  name={tabItem.iconName}
                  type={tabItem.iconType}
                  solid={tabItem.solid ? true : false}
                  color={focused ? appConfig.primaryColor : tabItem.iconColor}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}
const mapStateToProps = ({settings, files, authUser}) => {
  return {...settings, ...files, ...authUser};
};

const style = StyleSheet.create({
  textBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    letterSpacing: 0.09,
    color: appConfig.secondaryColor,
  },
});

export default connect(mapStateToProps, {})(MainApp);
