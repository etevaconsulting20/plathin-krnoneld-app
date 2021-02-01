import React from 'react';
import {Image, StyleSheet, Platform} from 'react-native';
import {Text} from 'react-native-elements';
import {appConfig} from '../settings/settings';
import {Left} from 'native-base';

function LogoTitle() {
  return (
    // <Image
    //   style={styles.logo}
    //   source={{
    //     uri: appConfig.headerLogoUrl,
    //   }}
    // />
    <Text
      style={{
        fontFamily: appConfig.fontFamily,
        color: appConfig.loginTextColor,
        fontSize: 18,
      }}
      h5>
      {'PLATHIN & KRONELD'}
    </Text>
  );
}

export default LogoTitle;

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 40,
    marginLeft: Platform.OS === 'ios' ? -190 : 0,
  },
});
