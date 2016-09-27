import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

const SERVER_URL = 'ws://localhost:3000/websocket';

class App extends Component {
  componentWillMount() {
    Meteor.connect(SERVER_URL);
  }

  handleAddItem() {
    const name = Math.floor(Math.random() * 10);

    Meteor.call('Items.addOne', { name }, (err, res) => {
      console.log('Items.addOne', err, res);
    });
  }

  render() {
    const { count } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native + Meteor!
        </Text>
        <Text style={styles.instructions}>
          Item Count: {count}
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
          <Text>Add Item</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapMeteorToProps = () => {
  Meteor.subscribe('items');
  return {
    count: Meteor.collection('items').find().length,
  };
};

export default createContainer(mapMeteorToProps)(App);
