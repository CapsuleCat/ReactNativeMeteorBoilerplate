import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

const SERVER_URL = 'ws://localhost:3000/websocket';

const { number } = PropTypes;

class App extends Component {
  static propTypes = {
    count: number,
  }

  componentWillMount() {
    Meteor.connect(SERVER_URL);
  }

  handleAddItem() {
    const name = Math.floor(Math.random() * 10);

    Meteor.call('Items.addOne', { name });
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
        <TouchableOpacity
          onPress={this.handleAddItem}
          style={styles.button}
        >
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
  Meteor.subscribe('tasks');
  return {
    count: Meteor.collection('tasks').find().length,
  };
};

export default createContainer(mapMeteorToProps, App);
