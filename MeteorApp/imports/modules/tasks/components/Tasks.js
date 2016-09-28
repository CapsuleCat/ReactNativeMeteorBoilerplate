import React, { Component, PropTypes } from 'react';

import Task from './Task';


const { arrayOf, func, object, shape } = PropTypes;

export default class Tasks extends Component {
  static propTypes = {
    onDelete: func.isRequired,
    onToggleCompleted: func.isRequired,
    tasks: arrayOf(shape({
      _id: object,
    })),
  }

  render() {
    const { onDelete, onToggleCompleted, tasks } = this.props;

    return (
      <ul>
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
      </ul>
    );
  }
}
