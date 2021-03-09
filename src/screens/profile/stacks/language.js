import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { getLanguageFromCode, AsyncStorage } from '../../../util/helpers/helpers';

import {
  Container,
  Card,
  Left,
 
} from 'native-base';
import { ListItem, Icon, Avatar, Input, Button } from 'react-native-elements';
import { appConfig } from '../../../settings/settings';
import { changeLanguage ,update} from '../../../actions/index';

const list = [
  {
    name: 'English',
    code: 'en',
    flagSrc: require('../../../assets/flags/english.png'),
  },
  {
    name: 'Finnish',
    code: 'fi',
    flagSrc: require('../../../assets/flags/finnish.png'),
  },
];

class LanguageStack extends Component {
  state = {
    firstName: '',
    firstNameError: false,
    lastName: '',
    lastNameError: false,
    phoneNumber: '',
    phoneNumberError: false,
    email: '',
    emailError: false,
    loading: false,
    lang:this.props.locale
  };
  isEmailValid = true;
  isfisrtNameValid = true;
  isPhoneNumberValid = true;
  isLastNameValid = true;


  componentDidMount = async () => {
    let data = await AsyncStorage.getObjectData('profileData');
   
    
    this.setState({ email: data.email,firstName:data.foreName ,lastName:data.sureName,phoneNumber:data.phoneNumber.toString() })
    // this.props.navigation.setOptions({
    //   headerTitle: I18n.t('settings-editProfile'),
    //   headerTint: 'white',
    // });
    // this.props.navigation.dangerouslyGetParent().setOptions({
    //   tabBarVisible: false,
    // });
    // this.props.navigation
    //   .dangerouslyGetParent()
    //   .dangerouslyGetParent()
    //   .setOptions({
    //     headerShown: false,
    //   });
  };
  componentWillUnmount() {
    // this.props.navigation.dangerouslyGetParent().setOptions({
    //   tabBarVisible: false,
    // });
    // this.props.navigation
    //   .dangerouslyGetParent()
    //   .dangerouslyGetParent()
    //   .setOptions({
    //     headerShown: false,
    //   });
  }
  onChangeLanguage = (code) => {
    this.setState({lang:code})
   
  };
  onPhone(event) {
    
    this.setState({phoneNumber: event.nativeEvent.text});
    if (event.nativeEvent.text != '' && event.nativeEvent.text.length===10) {
      if(isNaN(event.nativeEvent.text)){
        this.isPhoneNumberValid = false;
      }else{
        this.isPhoneNumberValid = true;
        this.setState({phoneNumberError: false});
        return;
      }
     
    }
    this.isPhoneNumberValid = false;
  }
  onFirstName(event) {
    this.setState({firstName: event.nativeEvent.text});
    if (event.nativeEvent.text != '') {
      this.isfisrtNameValid = true;
      this.setState({firstNameError: false});
      return;
    }
    this.isfisrtNameValid = false;
  }
  onLastName(event) {
    this.setState({lastName: event.nativeEvent.text});
    if (event.nativeEvent.text != '') {
      this.isLastNameValid = true;
      this.setState({lastNameError: false});
      return;
    }
    this.isLastNameValid = false;
  }

  updateUser =()=>{
    if (!this.isEmailValid) {
      this.setState({emailError: true});
    }
    if (!this.isfisrtNameValid) {
      this.setState({firstNameError: true});
    }
    if (!this.isLastNameValid) {
      this.setState({lastNameError: true});
    }
    if (!this.isPhoneNumberValid) {
      this.setState({phoneNumberError: true});
    }
    if (this.isfisrtNameValid && this.isPhoneNumberValid && this.isLastNameValid) {
   
      let model = {
        phoneNumber: this.state.phoneNumber,
        firstName:this.state.firstName,
        lastName: this.state.lastName
      };
      let data={
        phoneNumber: this.state.phoneNumber,
        foreName:this.state.firstName,
        sureName: this.state.lastName,
        email:this.state.email
      }
     
      AsyncStorage.storeObjectData('profileData',data);
    
      this.props.update(model);
      setTimeout(() => {
        setTimeout(() => {
          this.props.changeLanguage(this.state.lang);
        }, 200);
        // this.props.navigation.push('profile-main');
      }, 200);
    }
    
   
  }
  render() {
    return (
      <>
        {/* <Container> */}
          <ScrollView>
            {/* AboutYouCard */}
            <Card style={style.AboutUsCard}>
              <View collapsable={false} style={{ marginLeft: 127, marginTop: 10 }}>

                <Avatar
                  rounded
                  source={require("../../../assets/images/avtar.jpg")}
                  size="large"

                />

              </View>
            </Card>
            <Input
              style={{
                fontFamily: appConfig.fontFamily,
                color: "#000",
                padding: 5
              }}
              key="firstname-input-key"
              value={this.state.firstName}
              errorMessage={
                this.state.firstNameError ? I18n.t('about-firstNameError') : null
              }
              errorStyle={{ color: "red" }}
              onChange={(e) => this.onFirstName(e)}

              label={
                <Text
                  style={{
                    fontFamily: appConfig.fontFamily,
                    color: "#000",
                    padding: 5
                  }}
                  h5>

                  {I18n.t('about-firstName')}
                </Text>
              }
              placeholder={I18n.t('about-firstName')}
              placeholderTextColor={'grey'}></Input>
            <Input
              style={{
                fontFamily: appConfig.fontFamily,
                color: "#000",
                padding: 5
              }}
              key="lastName-input-key"
              value={this.state.lastName}
              errorMessage={
                this.state.lastNameError ? I18n.t('about-lastNameError') : null
              }
              errorStyle={{ color: "red" }}
              onChange={(e) => this.onLastName(e)}

              label={
                <Text
                  style={{
                    fontFamily: appConfig.fontFamily,
                    color: "#000",
                    padding: 5
                  }}
                  h5>

                  {I18n.t('about-lastName')}
                </Text>
              }
              placeholder={I18n.t('about-lastName')}
              placeholderTextColor={'grey'}></Input>
            <Input
              style={{
                fontFamily: appConfig.fontFamily,
                color: "#000",
                padding: 5
              }}
              key="email-input-key"
              editable={false}
              value={this.state.email}
              label={
                <Text
                  style={{
                    fontFamily: appConfig.fontFamily,
                    color: "#000",
                    padding: 5
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
                color: "#000",
                padding: 5
              }}
              key="phoneNumber-input-key"
              value={this.state.phoneNumber}
              keyboardType="numeric"
              errorMessage={
                this.state.phoneNumberError ? I18n.t('about-phoneNumberError') : null
              }
              errorStyle={{ color: "red" }}
              onChange={(e) => this.onPhone(e)}
              // leftIcon={
              //   <Icon
              //     type="font-awesome"
              //     solid={true}
              //     size={18}
              //     name="volume-control-phone"
              //     color="#000"
              //   />
              // }
              label={
                <Text
                  style={{
                    fontFamily: appConfig.fontFamily,
                    color: "#000",
                    padding: 5
                  }}
                  h5>

                  {I18n.t('about-phoneNumber')}
                </Text>
              }
              placeholder={I18n.t('about-phoneNumber')}
              placeholderTextColor={'grey'}></Input>
            <View collapsable={false} style={style.cardHeader}>
              <Left style={{ padding: 16 }}>
                <Text style={style.Title}>{I18n.t('settings-language')}</Text>
              </Left>
            </View>
            <View>
              {list.map((l, i) => {
                return (
                  <ListItem
                    key={i}
                    onPress={() => this.onChangeLanguage(l.code)}>
                    <Avatar source={l.flagSrc} size="small" rounded />
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text style={{ fontFamily: appConfig.fontFamily }}>
                          {l.name}
                        </Text>
                      </ListItem.Title>
                    </ListItem.Content>
                    {this.state.lang === l.code ? (
                      <Icon
                        type="font-awsome"
                        name="check"
                        color={appConfig.primaryColor}
                      />
                    ) : null}
                  </ListItem>
                );
              })}
            </View>
            <View style={{ textAlign: "center", padding: 10 }}>
              <Button
                key="get-pin-btn-key"
                titleStyle={{ fontFamily: appConfig.fontFamily, }}
                buttonStyle={{
                  backgroundColor: appConfig.primaryColor,
                  padding: 10,
                  width: 100,
                  // marginTop: 10,

                }}
                title="Update"
                onPress={() => this.updateUser()}></Button>
            </View>

          </ScrollView>
        {/* </Container> */}
      </>
    );
  }
}

const style = StyleSheet.create({
  Title: {
    fontFamily: appConfig.fontFamily,
    fontSize: 18,
    letterSpacing: 0.09,
    color: '#000000',
    paddingBottom: 10,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    maxHeight: 61,
  },
  languageText: {
    color: 'black',
    fontFamily: 'CeraPro-Medium',
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 5,
  },
  AboutUsCard: {
    // marginTop: 8,
    flex: 1,
    flexDirection: 'column',
    height: 100,
  },
});

const mapStateTopProps = ({ settings,authUser }) => {
  return { ...settings,...authUser };
};
export default connect(mapStateTopProps, {
  changeLanguage,update
})(LanguageStack);
