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
import {changePassword} from '../actions/index';

class ChangePwdScreen extends Component {
  state = {
    confirmPasswordError: false,
    password: '',
    confirmPassword: '',
    passwordError: false,
    tokenError: false,
    loading: false,
   
  };
  isPasswordValid = false;
  isConfirmPwdValid = false;
  str = this.props.location.search;
  code = str.search("oobCode");
  ext = str.search("&apiKey");
  oobCode=str.slice(code+8,ext);
  

  onPassChange(event) {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    this.setState({password: event.nativeEvent.text});
    if (re.test(event.nativeEvent.text)) {
        
      this.isPasswordValid = true;
      this.setState({passwordError: false});
      return;
    }
    this.isPasswordValid = false;
  }
  onConfirmPassChange(event) {
    this.setState({confirmPassword: event.nativeEvent.text});
    if (event.nativeEvent.text === this.state.password) {
      this.isConfirmPwdValid = true;
      this.setState({confirmPasswordError: false});
      return;
    }
    this.isConfirmPwdValid = false;
  }

  
  sendMagicLink = () => {
    if (!this.isPasswordValid) {
      this.setState({passwordError: true});
    }
    if (!this.isConfirmPwdValid) {
        this.setState({confirmPasswordError: true});
      }
    if (this.isConfirmPwdValid && this.isPasswordValid) {
        let data={
            "oobCode": oobCode,
            "password": this.state.password
          }
    
      this.props.changePassword(data);
    }
  };
  gotToLogin = () => {
    this.props.navigation.dispatch(StackActions.replace('login'));
  };
  getFormContent = () => {

    return (
      <>
        <Input
          style={{
            fontFamily: appConfig.fontFamily,
            color: appConfig.loginTextColor,
          }}
          key="pin-input-key"
          value={this.state.password}
          secureTextEntry={true}
          errorMessage={
            this.state.passwordError ? I18n.t('login-passwordErrorMessage') : null
          }
          errorStyle={{color: appConfig.loginTextColor}}
          onChange={(e) => this.onPassChange(e)}
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
          <Input
          style={{
            fontFamily: appConfig.fontFamily,
            color: appConfig.loginTextColor,
          }}
          key="pin-input-keys"
          value={this.state.confirmPassword}
          secureTextEntry={true}
          errorMessage={
            this.state.confirmPasswordError ? I18n.t('login-confirmPasswordErrorMessage') : null
          }
          errorStyle={{color: appConfig.loginTextColor}}
          onChange={(e) => this.onConfirmPassChange(e)}
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
          title="Submit"
          onPress={() => this.sendMagicLink()}></Button>
          </View>
          <View style={{flex:1}}>
          <Button
          key="get-pin-btn-key"
          titleStyle={{fontFamily: appConfig.fontFamily}}
          buttonStyle={{
            backgroundColor: appConfig.primaryColor,
            padding: 10,
            width: 100,
            marginTop: 10,
            marginRight:20
          }}
          title="Cancel"
          onPress={() => this.gotToLogin()}></Button>
          </View>
         </View>
      </>
    );
  };

  render() {
    const {loading} = this.props;

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
                {this.getFormContent()}
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
  changePassword,
})(ChangePwdScreen);
