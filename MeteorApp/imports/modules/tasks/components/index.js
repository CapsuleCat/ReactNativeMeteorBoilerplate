import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import Filters from './Filters';
import Form from './Form';
import { default as TaskList } from './Tasks';
import { Tasks } from '../collections/tasks';
import { setFilter } from '../actions';
import { SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL } from '../constants';

const { arrayOf, func, number, object, oneOfType, shape, string } = PropTypes;

class TaskIndex extends Component {
  static propTypes = {
    filter: string,
    incompleteCount: number,
    handleDelete: func.isRequired,
    handleToggleCompleted: func.isRequired,
    handleSetFilter: func.isRequired,
    handleSubmit: func.isRequired,
    tasks: arrayOf(shape({
      _id: oneOfType([string, object]),
    }))
  }

  render() {
    const {
      filter,
      handleDelete,
      handleToggleCompleted,
      handleSetFilter,
      handleSubmit,
      tasks
    } = this.props;

    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <Filters
            filter={filter}
            onSetFilter={handleSetFilter}
          />

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

const getSelectors = (filter) => {
  switch (filter) {
  case SHOW_COMPLETED:
    return { completed: true };
  case SHOW_ACTIVE:
    return { completed: { $ne: true } };
  case SHOW_ALL:
  default:
    return {};
  }
};

const mapDataToProps = ({ filter }) => {
  return {
    handleToggleCompleted: (id, completed) => {
      Tasks.update(id, {
        $set: { completed: !completed }
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
    tasks: Tasks.find(getSelectors(filter), {
      sort: { createdAt: -1 }
    }).fetch(),
    incompleteCount: Tasks.find(getSelectors('SHOW_ACTIVE')).count(),
  }
};

const mapStateToProps = (state) => {
  const { filter } = state.tasks;

  return {
    filter,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetFilter: filter => dispatch(setFilter(filter)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  createContainer(
    mapDataToProps,
    TaskIndex
  )
);
