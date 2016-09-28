import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '/imports/modules/app/components/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
