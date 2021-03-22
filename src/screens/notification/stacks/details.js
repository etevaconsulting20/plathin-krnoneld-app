import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  View,
  Text,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {appConfig} from '../../settings/settings';
import {getDeleteNotification} from "../../../actions/index"
import moment, {locales} from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome5';

class NotificationsMainScreen extends Component {
  componentDidMount = () => {
    // this.props.navigation.setOptions({
    //   headerShown: true,
    //   cardOverlayEnabled: false,
    //   headerTitle: 'PLATHIN & KRONELD',
    //   headerTint: 'white',
    //   headerTitleStyle: {marginHorizontal: -10, fontSize: 18},
    //   headerLeft: () => (
    //     <HeaderBackButton
    //       tintColor={'white'}
    //       onPress={this.onBackPress}></HeaderBackButton>
    //   ),
    // });
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false,
    });
    this.props.navigation
      .dangerouslyGetParent()
      .dangerouslyGetParent()
      .setOptions({
        cardOverlayEnabled: false,
        headerTitle: 'PLATHIN & KRONELD',
        headerTint: 'white',
        headerTitleStyle: {marginHorizontal: -10, fontSize: 18},
        headerLeft: () => (
          <HeaderBackButton
            tintColor={'white'}
            onPress={this.onBackPress}></HeaderBackButton>
        ),
      });

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  };

  componentWillUnmount() {
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: true,
    });
    this.props.navigation
      .dangerouslyGetParent()
      .dangerouslyGetParent()
      .setOptions({
        headerShown: true,
      });
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.navigation.pop();
    return true;
  };
  deleteNotification = (id) => {
    this.props.getDeleteNotification(id);
    this.props.navigation.push('notification-main');
  };

  render() {
    const {data}=this.props.route.params;
    let date= moment(data.createdDate._seconds * 1000).format("DD/MM/YYYY")

    return (
      <SafeAreaView style={styles.container}>
        {/* <VirtualizedList
          data={dummyData}
          initialNumToRender={4}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          getItemCount={this.getItemCount}
          getItem={this.getItem}
        /> */}
        <TouchableOpacity onPress={()=>this.deleteNotification(data.id)}><Text style={{textAlign:"right",marginTop:10}}><Icon name="trash" size={15} color="#900"  /></Text></TouchableOpacity>
        <Text style={{fontSize:16,color:"#000",fontWeight:"bold",marginTop:-20,width:200}}>{data.title} </Text>
        <Text style={{color:"grey"}}><Icon name="calendar-alt" size={15} color="grey" />  {date}</Text>
        <Text style={{fontSize:14,marginTop:20}}>{data.body}</Text>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: 'red',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
const mapStateToProps = ({notification}) => {
  return notification;
};
export default connect(mapStateToProps, {
  getDeleteNotification,
})(NotificationsMainScreen);
