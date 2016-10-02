import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import {
  MKButton,
  MKCheckbox
} from 'react-native-material-kit';

const { bool, func, object, oneOfType, shape, string } = PropTypes;

// Task component - represents a single todo item
export default class Task extends Component {
  static propTypes = {
    onDelete: func.isRequired,
    onToggleCompleted: func.isRequired,
    task: shape({
      _id: oneOfType([object, string]),
      checked: bool,
      text: string,
    }).isRequired,
  }

  handleDeleteTask = () => {
    const { task } = this.props;
    const { _id } = task;

    this.props.onDelete(_id);
  }

  handleToggleCompleted = () => {
    const { task } = this.props;
    const { _id, completed } = task;
    this.props.onToggleCompleted(_id, completed);
  }

  render() {
    const { task } = this.props;
    const { completed } = task;

    return (
      <View>
        <MKButton
          onPress={this.handleDeleteTask}
        >
          <Text pointerEvents="none">&times;</Text>
        </MKButton>

        <MKCheckbox
          checked={completed}
          onCheckedChange={this.handleToggleCompleted}
        />

        <Text>{task.text}</Text>
      </View>
    );
  }
}
