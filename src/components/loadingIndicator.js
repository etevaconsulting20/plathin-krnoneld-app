import React, {Component} from 'react';
import {View, StyleSheet, Image, ActivityIndicator, Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import {appConfig} from '../settings/settings';

export default ({isVissible, color, message}) => {
  // return (
  //   <Overlay
  //     style={{zIndex: 2}}
  //     isVisible={isVissible}
  //     overlayStyle={{backgroundColor: 'transparent', elevation: 0, zIndex: 0}}
  //     backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 0}}
  //     width="auto"
  //     height="auto">
  //     <>
  //       <View style={{paddingBottom: 10}}>
  //         <Bubbles size={10} color={appConfig.primaryColor} />
  //       </View>
  //       <Text
  //         style={{
  //           color: appConfig.primaryColor,
  //           fontFamily: appConfig.fontFamily,
  //           fontSize: 16,
  //         }}>
  //         {message}
  //       </Text>
  //     </>
  //   </Overlay>
  // );

  return (
    <>
      {isVissible ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignContent: 'center',
            zIndex: 3,
            alignItems: 'center',
          }}>
          <>
            <View style={{paddingBottom: 10}}>
              <Bubbles size={10} color={appConfig.primaryColor} />
            </View>
            <Text
              style={{
                color: appConfig.primaryColor,
                fontFamily: appConfig.fontFamily,
                fontSize: 16,
              }}>
              {message}
            </Text>
          </>
        </View>
      ) : null}
    </>
  );
};
