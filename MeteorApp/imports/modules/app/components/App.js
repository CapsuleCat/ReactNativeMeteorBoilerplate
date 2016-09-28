import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Form from '/imports/modules/tasks/components/Form';
import { default as TaskList } from '/imports/modules/tasks/components/Tasks';
import { Tasks } from '/imports/modules/tasks/collections/tasks';

const { arrayOf, func, object, shape } = PropTypes;

// App component - represents the whole app
class App extends Component {
  static propTypes = {
    handleDelete: func.isRequired,
    handleToggleCompleted: func.isRequired,
    handleSubmit: func.isRequired,
    tasks: arrayOf(shape({
      _id: object,
    }))
  }

  render() {
    const {
      handleDelete,
      handleToggleCompleted,
      handleSubmit,
      tasks
    } = this.props;

    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <Form onSubmit={handleSubmit} />
        </header>

        <TaskList
          onDelete={handleDelete}
          onToggleCompleted={handleToggleCompleted}
          tasks={tasks}
        />
      </div>
    );
  }
}

const mapDataToProps = () => {
  return {
    handleToggleCompleted: (id, checked) => {
      Tasks.update(id, {
        $set: { checked: !checked }
      })
    },
    handleDelete: (id) => {
      Tasks.remove(id);
    },
    handleSubmit: (text) => {
      return Tasks.insert({
        text,
        createdAt: new Date(),
      });
    },
    tasks: Tasks.find({}, {
      sort: { createdAt: -1 }
    }).fetch(),
  }
};

export default createContainer(mapDataToProps, App);
