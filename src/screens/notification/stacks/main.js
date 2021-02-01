import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const dummyData = new Array(1000);

const Item = ({title}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

class PureItem extends PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.toDetails}>
        <Item title={this.props.item.title} />
      </TouchableOpacity>
    );
  }
}

class NotificationsMainScreen extends Component {
  componentDidMount = () => {
    this.props.navigation.addListener('focus', () => {
      debugger;
      console.log('added');
    });
  };
  getItem = (data, index) => {
    return {
      id: Math.random().toString(12).substring(0),
      title: `Item ${index + 1}`,
    };
  };
  getItemCount = (data) => {
    return data.length;
  };
  toDetails = () => {
    this.props.navigation.push('dashboard-details');
  };
  getItemLayout = (data, index) => ({
    length: 70,
    offset: 70 * index,
    index,
  });
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <VirtualizedList
          data={dummyData}
          // removeClippedSubviews={true}
          windowSize={21}
          initialNumToRender={4}
          renderItem={({item}) => {
            return <PureItem toDetails={this.toDetails} item={item} />;
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
    backgroundColor: 'grey',
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
