import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import taskReducer from '/imports/modules/tasks/reducers';
import App from '/imports/modules/app/components/App';

const store = createStore(combineReducers(
  {
    tasks: taskReducer,
  }
));

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('render-target')
  );
});
