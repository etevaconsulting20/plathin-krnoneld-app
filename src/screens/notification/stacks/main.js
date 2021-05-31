import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';

import {
  View,
  Text,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
  Image,
  RefreshControl,
  LogBox
} from 'react-native';
import {
  getAllNotifications,
  getAllSeenNotifications,
} from '../../../actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment, {locales} from 'moment';
import I18n from 'react-native-i18n';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

//const dummyData = new Array(1000);

const Item = ({data}) => {
  let weight = data.isSeen === true ? 'normal' : 'bold';
  let size = data.isSeen === true ? 16 : 17;
  let date = moment(data.createdDate._seconds * 1000).format('DD/MM/YYYY');

  return (
    <View style={styles.item}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: size,
          color: '#000',
          fontWeight: weight,
          width: 200,
          marginTop: -10,
        }}>
        {' '}
        <Icon name="comments-o" size={25} color="#900" /> {data.title}
      </Text>
      {!data.isSeen && (
        <View
        style={{
          width:300,
          marginHorizontal:290,
         // marginVertical:-10,
          marginTop:-20,
          justifyContent:"center",alignItems:"center",
          width: 25,
          height: 25,
          borderRadius: 30 / 2,
          backgroundColor: "green",
        }}><Text style={{
          color: 'white',
          fontWeight:"bold",
          fontSize:9,
          textAlign:"center"
        }}>
        {I18n.t('New')}
        </Text>
        
      </View>
      )}
      <View style={{display:"flex"}}>
      <Text
        numberOfLines={1}
        style={{ color: 'grey', marginTop:10,fontWeight: weight,marginLeft:10,width:140}}>
        {data.body}
      </Text>
      <Text style={{textAlign: 'right', color: 'grey',marginTop:-14, fontWeight: weight}}>
        {' '}
        {date}
      </Text>
    </View>
    </View>
  );
};

class PureItem extends PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.toDetails(this.props.item)}>
        <Item data={this.props.item} />
      </TouchableOpacity>
    );
  }
}

class NotificationsMainScreen extends Component {
  componentDidMount = () => {
    LogBox.ignoreLogs(['Warning: ...']);  
    this.props.getAllNotifications();
   
    this.props.navigation.addListener('focus', () => {
      this.props.navigation
        .dangerouslyGetParent()
        .dangerouslyGetParent()
        .setOptions({
          cardOverlayEnabled: false,
          headerTitle: 'PLATHIN & KRONELD',
          headerTint: 'white',
          headerTitleStyle: {marginHorizontal: 0, fontSize: 18},
          headerLeft: null,
        });
      this.props.getAllNotifications();
    });
  };

  refreshPage = () => {
    this.props.getAllNotifications();
  };
  getItem = (data, i) => {
    return {
      ...data[i],
    };
  };
  getItemCount = (data) => {
    return data.length;
  };

  toDetails = (data) => {
    console.log("Data",data.id)
    this.props.getAllSeenNotifications(data.id);
    this.props.navigation.navigate('notification-details', {data});
  };

  render() {
    let sortData = this.props.notification && this.props.notification;
    let notification = sortData.sort(function (a, b) {
      return (
        new Date(b.createdDate._seconds * 1000) -
        new Date(a.createdDate._seconds * 1000)
      );
    });
    return (
      <SafeAreaView style={styles.container}>
        {notification.length===0 &&<Text style={{marginHorizontal:90,marginVertical:180,fontSize:16}}>{I18n.t('NotifyMsg')}</Text>}
        <VirtualizedList
          data={notification}
          // removeClippedSubviews={true}
          windowSize={21}
          //initialNumToRender={4}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.refreshPage}
            />
          }
          renderItem={({item}) => {
            return (
              <PureItem
                toDetails={(item) => this.toDetails(item)}
                item={item}
              />
            );
          }}
          // onScroll={() => console.log('onscroll')}
          // onMomentumScrollBegin={() => console.log('onscrollmomentum')}
          keyExtractor={(item) => item.id}
          getItemCount={this.getItemCount}
          getItem={this.getItem}
          // getItemLayout={this.getItemLayout}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    height: 100,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
});
const mapStateToProps = ({notification}) => {
  return notification;
};
export default connect(mapStateToProps, {
  getAllNotifications,
  getAllSeenNotifications,
})(NotificationsMainScreen);
