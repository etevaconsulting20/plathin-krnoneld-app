
import React, {Component} from 'react';
import {View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAllFiles} from '../../../actions/index';
import LoadingIndicator from '../../../components/loadingIndicator';
import { appConfig } from '../../../settings/settings';
import { Icon, SearchBar } from 'react-native-elements';
import Folder from 'react-native-vector-icons/Entypo';
import PDF from 'react-native-vector-icons/FontAwesome';
import { filter, includes } from 'lodash';
import moment, { locales } from 'moment';
import I18n from 'react-native-i18n';


import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
} from 'native-base';
const openModal = () => {
  props.navigation.navigate('modal', {
    type: 'delete-confirmation',
  });
};

class DashboardMainScreen extends Component {
  state = {
    searchText: '',
    flag:false,
    filterArray:[],
    openId:''
  };
  componentDidMount = () => {
    this.props.getAllFiles();
    this.props.navigation.addListener('focus', () => {
      this.props.getAllFiles();
      this.setState({flag:false})
      this.props.navigation
        .dangerouslyGetParent()
        .dangerouslyGetParent()
        .setOptions({
          cardOverlayEnabled: false,
          headerTitle: 'PLATHIN & KRONELD',
          headerTint: 'white',
          headerTitleStyle: {marginHorizontal: 0, fontSize: 18},
          headerLeft: null,
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
      this.props.getAllFiles();
    });
  };
  viewPdf = (name, id) => {
    this.props.navigation.navigate('dashboard-viewpdf', { id: id, name: name });
  };
  refreshPage = () => {
    this.props.getAllFiles();
  };
  onSearch = (text) => {
    this.setState({ searchText: text });
  };
  getFilteredList = (list) => {
    
    let searchText = this.state.searchText;
    if (searchText == '') {
      return list;
    }
    let result = filter(list, (itm) => {
      return includes((itm).toLowerCase(), searchText.toLowerCase());
    });

    return result;
  };
  openFiles=(name,id)=>{
    const largeGroup = this.props.files&& this.props.files.filter(activity => (
      activity.folderName ===name
  )); 
    
    this.setState({flag:true,filterArray:largeGroup,openId:id})
  }
  

  render() {
    const { loading, files } = this.props;
    let sortData = this.props.files && this.props.files;
    let fileData = sortData.sort(function (a, b) {
      return new Date(b.sharedDate) - new Date(a.sharedDate);
    });
    let arr = [];
    const largeGroup = fileData && fileData.filter(activity => (
      activity.folderName &&
      arr.push(activity.folderName)
    ));
    let uniqueNames = Array.from(new Set(arr));
    console.log("largeGroup", this.state.filterArray);
    return (
      <>
        {/* <LoadingIndicator
          isVissible={loading}
          message={'fetching files'}></LoadingIndicator> */}
        <SearchBar
          lightTheme
          placeholder={I18n.t('placeholder_typeHere')}
          round
          onChangeText={(text) => this.onSearch(text)}
          value={this.state.searchText}
        />

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.refreshPage} />
          }>
          <List>
            {uniqueNames
              ? this.getFilteredList(uniqueNames).map((name, key) => {
              return (
                <View key={key}>
                <ListItem
                  onPress={()=>this.openFiles(name,key)}
                >
                  <Left>
                  <Folder name="folder" size={25} color={appConfig.primaryColor} />
                    <Text
                      style={{
                        fontFamily: appConfig.fontFamily,
                        color: 'black',
                        fontWeight:'bold',
                        marginLeft:10
                      }}>
                      {name}
                     
                    </Text>

                  </Left>

                  <Right>
                    {/* <Icon
                      name="download"
                      type="font-awesome"
                      color={appConfig.primaryColor}></Icon> */}
                  </Right>
                 
                 
                </ListItem>
              
                {this.state.flag && this.state.openId ===key ? 
               <List>
            {this.state.filterArray.map((file, index) => {
                return (
                  <ListItem
                    key={index}
                    onPress={() => this.viewPdf(file.name, file.id)}>
                    <Left>
                  <PDF name="file-pdf-o" size={25} color="grey" />
                      <Text
                        style={{
                          fontFamily: appConfig.fontFamily,
                          color: 'black',
                          marginLeft:10
                        }}>
                        {file.name}
                        <Text
                          style={{
                            fontFamily: appConfig.fontFamily,
                            color: 'grey',
                          }}>
                          {`\n ${moment(file.sharedDate).format("DD/MM/YYYY")}`}
                        </Text>
                      </Text>

                    </Left>

                    <Right>
                      <Icon
                        name="download"
                        type="font-awesome"
                        color={appConfig.primaryColor}></Icon>
                    </Right>

                  </ListItem>
                );
              })}
              
          </List>
            :null}
               </View> 
               )
            }) :null}
         
          </List>
          
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = ({ files }) => {
  return files;
};

export default connect(mapStateToProps, {
  getAllFiles,
})(DashboardMainScreen);
