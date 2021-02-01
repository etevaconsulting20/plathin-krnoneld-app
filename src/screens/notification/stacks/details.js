import React, {Component} from 'react';

import {
  View,
  Text,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const dummyData = new Array(1000);

const Item = ({title}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

class NotificationsMainScreen extends Component {
  getItem = (data, index) => {
    return {
      id: Math.random().toString(12).substring(0),
      title: `Item ${index + 1}`,
    };
  };
  getItemCount = (data) => {
    return data.length;
  };
  render() {
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
        <Text>Details</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default NotificationsMainScreen;
