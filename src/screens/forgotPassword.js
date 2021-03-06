import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
  Platform,
  Linking
} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';
import {Card, Input, Text, Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import I18n from 'react-native-i18n';
import {appConfig} from '../settings/settings';
import LoadingIndicator from '../components/loadingIndicator';
import {forgotPassword} from '../actions/index';

class ForgotScreen extends Component {
  state = {
    emailSent: false,
    email: '',
    token: '',
    emailError: false,
    tokenError: false,
    loading: false,
   
  };
  isEmailValid = false;
  isTokenValid = false;
  

  onEmailChange(event) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;
    this.setState({email: event.nativeEvent.text});
    if (re.test(event.nativeEvent.text)) {
      this.isEmailValid = true;
      this.setState({emailError: false});
      return;
    }
    this.isEmailValid = false;
  }

  
  sendMagicLink = () => {
    if (!this.isEmailValid) {
      this.setState({emailError: true});
    }
  
    if (this.isEmailValid) {
      let model = {
        email: this.state.email,
        
      };
    
      this.props.forgotPassword(model);
    }
  };
  gotToLogin = () => {
    this.props.navigation.dispatch(StackActions.replace('login'));
  };
  getFormContent = (emailSent) => {
    return (
      <>
        <Input
          style={{
            fontFamily: appConfig.fontFamily,
            color: appConfig.loginTextColor,
          }}
          key="email-input-key"
          value={this.state.email}
          errorMessage={
            this.state.emailError ? I18n.t('login-emailErrorMessage') : null
          }
          errorStyle={{color: appConfig.loginTextColor}}
          onChange={(e) => this.onEmailChange(e)}
          leftIcon={
            <Icon
              type="font-awesome"
              solid={true}
              size={18}
              name="envelope"
              color={appConfig.loginTextColor}
            />
          }
          label={
            <Text
              style={{
                fontFamily: appConfig.fontFamily,
                color: appConfig.loginTextColor,
              }}
              h5>
              {I18n.t('login-emailLabel')}
            </Text>
          }
          placeholder={I18n.t('login-emailPlaceholder')}
          placeholderTextColor={'grey'}></Input>
          <View style={{display:"flex", flexDirection:"row",}}>
              <View style={{flex:1}}>
        <Button
          key="get-pin-btn-key"
          titleStyle={{fontFamily: appConfig.fontFamily}}
          buttonStyle={{
            backgroundColor: appConfig.primaryColor,
            padding: 10,
            width: 100,
            marginTop: 10,
            marginLeft:10
          }}
          title={I18n.t('login-submit')}
          onPress={() => this.sendMagicLink()}></Button>
          </View>
          <View style={{flex:1,marginRight:30}}>
          <Button
          key="get-pin-btn-key"
          titleStyle={{fontFamily: appConfig.fontFamily}}
          buttonStyle={{
            backgroundColor: "#cccccc",
            padding: 10,
            width: 100,
            marginTop: 10,
            color:"#666666"
          }}
          title={I18n.t('logout-cancel')}
          onPress={() => this.gotToLogin()}></Button>
          </View>
         </View>
      </>
    );
  };

  render() {
    const {loading, emailSent} = this.props;

    return (
      <>
        <LoadingIndicator
          color={appConfig.primaryColor}
          isVissible={loading}
          message={I18n.t('Loading')}></LoadingIndicator>
        <KeyboardAwareScrollView
          style={{backgroundColor: 'white'}}
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}>
          <ImageBackground
            source={require('../assets/images/download.jpg')}
            style={style.image}>
            <View style={style.mainDiv}>
              <View style={style.header}>
                <View style={{padding: 20}}>
                  {/* <Image
                    style={{width: 500, height: 50}}
                    source={require('../assets/images/logo.webp')}
                  /> */}
                </View>
                <Text
                  style={{
                    fontFamily: appConfig.fontFamily,
                    color: appConfig.loginTextColor,
                  }}
                  h3>
                  {I18n.t('login-header')}{' '}
                </Text>
              </View>

              <View style={style.loginCard}>
                {this.getFormContent(emailSent)}
                <View style={{paddingTop: 10}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'grey',
                      fontFamily: appConfig.fontFamily,
                    }}></Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const style = StyleSheet.create({
  mainDiv: {
    display: 'flex',
    height: 700,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    flex: 2,
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoDiv: {
    flex: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },
  logoGroup: {
    flex: 1,

    width: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonGroup: {
    display: 'flex',
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({authUser}) => {
  return authUser;
};
export default connect(mapStateToProps, {
  forgotPassword,
})(ForgotScreen);
