import React, {Component} from 'react';
import {View, Text, BackHandler, TouchableOpacity} from 'react-native';
import PDFView from 'react-native-view-pdf';
import {connect} from 'react-redux';
import {downloadFileAction} from '../../../actions/index';
import {appConfig} from '../../../settings/settings';
import {HeaderBackButton} from '@react-navigation/stack';
import LoadingIndicator from '../../../components/loadingIndicator';
import {Icon} from 'react-native-elements';
import Share from 'react-native-share';

class ViewPdfScreen extends Component {
  state = {
    id: null,
    name: '',
  };
  componentDidMount = () => {
    let id = this.props.route.params.id;
    console.log(id);
    let name = this.props.route.params.name;
    this.props.navigation
      .dangerouslyGetParent()
      .dangerouslyGetParent()
      .setOptions({
        headerShown: true,
        cardOverlayEnabled: false,
        headerTitle: name,
        headerTint: 'white',
        headerTitleStyle: {fontFamily: appConfig.fontFamily, fontSize: 18},
        headerLeft: () => (
          <HeaderBackButton
            tintColor={'white'}
            onPress={this.onBackPress}></HeaderBackButton>
        ),
        headerRight: () => (
          <View
            style={{
              marginRight: 10,
              display: 'flex',
              flexDirection: 'row',
              width: 40,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={this.sharePdf}>
              <Icon name="share-alt" type="font-awesome" color="white"></Icon>
            </TouchableOpacity>
          </View>
        ),
      });
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false,
    });
    // this.props.navigation
    //   .dangerouslyGetParent()
    //   .dangerouslyGetParent()
    //   .setOptions({
    //     headerShown: false,
    //   });

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    this.props.downloadFileAction({
      id: id,
      name: name,
    });
    this.setState({
      id: id,
      name: name,
    });
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
  sharePdf = async () => {
    const url = 'data:application/pdf;base64,' + this.props.fileBase64;
    var options = {
      message: 'from app',
      url: url,
      filename: this.state.name,
    };
    Share.open(options)
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        console.log('ee', error);
      });
  };
  render() {
    const resourceType = 'base64';
    const {fileBase64, loading} = this.props;
    return (
      <>
        <LoadingIndicator isVissible={loading} message={'Opening File'} />
        <View style={{flex: 1}}>
          {/* Some Controls to change PDF resource */}
          {fileBase64 ? (
            <PDFView
              fadeInDuration={250.0}
              style={{flex: 1}}
              resource={fileBase64}
              resourceType={resourceType}
              onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
              onError={(e) => console.log('Cannot render PDF', e)}
            />
          ) : (
            <Text>"No file"</Text>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = ({files}) => {
  return files;
};

export default connect(mapStateToProps, {
  downloadFileAction,
})(ViewPdfScreen);
