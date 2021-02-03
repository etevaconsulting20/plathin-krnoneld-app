// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, {useEffect, Component} from 'react';

// import SplashScreen from 'react-native-splash-screen';
// import {Alert, LogBox} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
// import 'react-native-gesture-handler';
// import RootNavigationContainer from './src/containers/rootContainer';
// import {appConfig} from './src/settings/settings';
// import {configureStore} from './src/store/index';
// import {Provider} from 'react-redux';
// import PushController from "./PushController"
// class App extends Component {
//   async componentDidMount() {
//     //we check if user has granted permission to receive push notifications.
//     // this.checkPermission();
//     // Register all listener for notification
//     // this.createNotificationListeners();
//     // SplashScreen.hide()
//     // LogBox.ignoreAllLogs();
//   }

//   render() {
//     return (
//       <Provider store={configureStore()}>
//         <RootNavigationContainer></RootNavigationContainer>
//       </Provider>
//     );
//   }
// }

// export default App;
import React, { Fragment } from 'react';
import PushController from './PushController';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList} from 'react-native';

import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import RootNavigationContainer from './src/containers/rootContainer';
import {appConfig} from './src/settings/settings';
import {configureStore} from './src/store/index';
import {Provider} from 'react-redux';
// Dummy data for list, we'll replace this with data received from push
let pushData = [
  {
    title: "First push",
    message: "First push message"
  },
  {
    title: "Second push",
    message: "Second push message"
  }
]

_renderItem = ({ item }) => (
  <View key={item.title}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.message}>{item.message}</Text>
  </View>
);

const App = () => {
  return (
    <Fragment>
     
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.listHeader}>
            <Text>Push Notifications</Text>
          </View>
          <View style={styles.body}>
            <FlatList
              data={pushData}
              renderItem={(item ) => this._renderItem(item)}
              keyExtractor={(item ) => item.title}
            />
            {/* <LearnMoreLinks /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
      <PushController/>
      <Provider store={configureStore()}>
       <RootNavigationContainer></RootNavigationContainer>
       </Provider>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {backgroundColor: Colors.lighter,},
  listHeader:{ backgroundColor: '#eee', color: "#222", height: 44, padding: 12},
  title:{fontSize: 18, fontWeight: 'bold', paddingTop: 10},
  message:{ fontSize: 14, paddingBottom: 15, borderBottomColor: "#ccc", borderBottomWidth: 1},
  engine: { position: 'absolute', right: 0,},
  body: { backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 10, },
  sectionContainer: { marginTop: 32, paddingHorizontal: 24, },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: Colors.black},
  sectionDescription: { marginTop: 8, fontSize: 18, fontWeight: '400', color: Colors.dark,},
  highlight: { fontWeight: '700'},
  footer: { color: Colors.dark, fontSize: 12, fontWeight: '600', padding: 4, paddingRight: 12, textAlign: 'right',},
});

export default App;