import React, { Component } from 'react';
import { View } from 'react-native';

import TaskIndex from '../../tasks/components';
import Meteor from 'react-native-meteor';

const SERVER_URL = 'ws://localhost:3000/websocket';

// App component - represents the whole app
export default class App extends Component {
  componentWillMount() {
    Meteor.connect(SERVER_URL);
  }

  render() {
    return (
      <View>
        <TaskIndex />
      </View>
    );
  }
}
