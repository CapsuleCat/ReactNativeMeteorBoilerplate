import React, { Component, PropTypes } from 'react';

const { bool, func, object, shape, string } = PropTypes;

// Task component - represents a single todo item
export default class Task extends Component {
  static propTypes = {
    onDelete: func.isRequired,
    onToggleCompleted: func.isRequired,
    task: shape({
      _id: object,
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
    const { _id, checked } = task;
    this.props.onToggleCompleted(_id, checked);
  }

  render() {
    const { task } = this.props;
    const { checked } = task;

    return (
      <li className={`${checked ? 'checked' : ''}`}>
        <button
          className="delete"
          onClick={this.handleDeleteTask}
        >
          &times;
        </button>

        <input
          checked={checked}
          onClick={this.handleToggleCompleted}
          readOnly
          type="checkbox"
        />

      <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}
