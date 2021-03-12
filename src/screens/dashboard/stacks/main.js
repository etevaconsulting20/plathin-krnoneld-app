import React, {Component} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {getAllFiles} from '../../../actions/index';
import LoadingIndicator from '../../../components/loadingIndicator';
import {appConfig} from '../../../settings/settings';
import {Icon, SearchBar} from 'react-native-elements';
import {filter, includes} from 'lodash';
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

class DashboardMainScreen extends Component {
  state = {
    searchText: '',
  };
  componentDidMount = () => {
    this.props.getAllFiles();
  };
  viewPdf = (name, id) => {
    this.props.navigation.navigate('dashboard-viewpdf', {id: id, name: name});
  };
  refreshPage = () => {
    this.props.getAllFiles();
  };
  onSearch = (text) => {
    this.setState({searchText: text});
  };
  getFilteredList = (list) => {
    let searchText = this.state.searchText;
    if (searchText == '') {
      return list;
    }
    let result = filter(list, (itm) => {
      return includes((itm.name).toLowerCase(), searchText.toLowerCase());
    });

    return result;
  };
  render() {
    const {loading, files} = this.props;
    return (
      <>
        {/* <LoadingIndicator
          isVissible={loading}
          message={'fetching files'}></LoadingIndicator> */}
          <SearchBar
                lightTheme
                placeholder="Type Here..."
                round
                onChangeText={(text) => this.onSearch(text)}
                value={this.state.searchText}
              />
       
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.refreshPage} />
          }>
          <List>
            {files
              ? this.getFilteredList(files).map((file, index) => {
                  return (
                    <ListItem
                      key={index}
                      onPress={() => this.viewPdf(file.name, file.id)}>
                      <Left>
                        <Text
                          style={{
                            fontFamily: appConfig.fontFamily,
                            color: 'black',
                          }}>
                          {file.name}
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
                })
              : null}
          </List>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = ({files}) => {
  return files;
};

export default connect(mapStateToProps, {
  getAllFiles,
})(DashboardMainScreen);
