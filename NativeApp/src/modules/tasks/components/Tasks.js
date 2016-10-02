import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import Task from './Task';

const { arrayOf, func, object, oneOfType, shape, string } = PropTypes;

export default class Tasks extends Component {
  static propTypes = {
    onDelete: func.isRequired,
    onToggleCompleted: func.isRequired,
    tasks: arrayOf(shape({
      _id: oneOfType([string, object]),
    })),
  }

  render() {
    const { onDelete, onToggleCompleted, tasks } = this.props;

    return (
      <View>
        {
          tasks.map(t =>
            <Task
              key={t._id}
              onDelete={onDelete}
              onToggleCompleted={onToggleCompleted}
              task={t}
            />
          )
        }
      </View>
    );
  }
}
