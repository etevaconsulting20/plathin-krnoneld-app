import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';

import {
  View,
  Text,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
  Image
} from 'react-native';
import {getAllNotifications,getAllSeenNotifications} from "../../../actions/index"
import Icon from 'react-native-vector-icons/FontAwesome';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

//const dummyData = new Array(1000);

const Item = ({data}) => {
 let weight = data.isSeen===true? "normal":"bold";
 let size = data.isSeen===true? 16:17;
 let date= new Date(data.createdDate._seconds * 1000);
 let abc=new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).replace(/ /g, '-');
 console.log("abc",abc);
 console.log("date",date);
 

  return (
    
    <View style={styles.item}>
    
      <Text numberOfLines={1}  style={{fontSize: size,color:"#000",fontWeight:weight,width:200,marginTop:-10}}> <Icon name="comments-o" size={25} color="#900" />   {data.title}</Text>
      {!data.isSeen && <Text style={{textAlign:"right",marginTop:-25,color:"green",height:30}}><Image  style={{width:20,height:20}} source={require('../../../assets/images/new.png')}/></Text>}
      <Text numberOfLines={1} style={{flex:1,marginTop:1,color:"grey",fontWeight:weight}}>{data.body}</Text>
      <Text style={{textAlign:"right",color:"grey",fontWeight:weight}}>  {abc }</Text>
    </View>
  );
};

class PureItem extends PureComponent {


  
  render() {
    return (
      <TouchableOpacity onPress={()=>this.props.toDetails(this.props.item)}>
        <Item data={this.props.item} />
      </TouchableOpacity>
    );
  }
}

class NotificationsMainScreen extends Component {
  componentDidMount = () => {
    this.props.getAllNotifications()
    this.props.navigation.addListener('focus', () => {
      this.props.navigation
      .dangerouslyGetParent()
      .dangerouslyGetParent()
      .setOptions({
        headerShown: true,
      });
      this.props.getAllNotifications();
      console.log("added");
      
    });

  };
 
  getItem = (data,i) => {
    return {
      ...data[i]
    };
  };
  getItemCount = (data) => {
    return data.length;
  };

  toDetails = (data) => {
    this.props.getAllSeenNotifications(data.id)
    this.props.navigation.push('dashboard-details',{data});
  };

  render() {
    let sortData=this.props.notification && this.props.notification;
    let notification =sortData.sort(function(a,b){
      return new Date(b.createdDate._seconds * 1000) - new Date(a.createdDate._seconds * 1000);
    });
    return (
      <SafeAreaView style={styles.container}>
        <VirtualizedList
          data={notification}
          // removeClippedSubviews={true}
          windowSize={21}
          //initialNumToRender={4}
          renderItem={({item}) => {
            return <PureItem toDetails={(item)=>this.toDetails(item)} item={item} />;
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
  getAllNotifications,getAllSeenNotifications
})(NotificationsMainScreen);
