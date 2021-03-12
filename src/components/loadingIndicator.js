import React, {Component} from 'react';
import {View, StyleSheet, Image, ActivityIndicator, Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import {appConfig} from '../settings/settings';

export default ({isVissible, color, message}) => {
  return (
    <Overlay
      style={{zIndex: 2}}
      isVisible={isVissible}
      overlayStyle={{backgroundColor: 'transparent', elevation: 0, zIndex: 0}}
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 0}}
      width="auto"
      height="auto">
      <>
        <View style={{paddingBottom: 10}}>
          <Bubbles size={10} color={appConfig.primaryColor} />
        </View>
        {/* <Image
          source={{uri: 'http://www.clicktorelease.com/code/gif/1.gif'}}
          style={{width: 100, height: 100}}
        /> */}
        {/* <ActivityIndicator
          style={{padding: 10}}
          size="large"
          color={color}></ActivityIndicator> */}
        <Text
          style={{
            color: appConfig.primaryColor,
            fontFamily: appConfig.fontFamily,
            fontSize: 16,
          }}>
          Loading...
        </Text>
      </>
    </Overlay>
  );
};
