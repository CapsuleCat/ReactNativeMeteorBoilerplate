import React, { Component, PropTypes } from 'react';
import { SHOW_ACTIVE, SHOW_ALL } from '../constants';
import { Text, View } from 'react-native';
import { MKCheckbox } from 'react-native-material-kit';

const { func, string } = PropTypes;

export default class Filters extends Component {
  static propTypes = {
    filter: string,
    onSetFilter: func.isRequired,
  }

  handleToggleFilter = () => {
    const { filter, onSetFilter } = this.props;

    let newFilter = SHOW_ACTIVE;

    if (filter === SHOW_ACTIVE) {
      newFilter = SHOW_ALL;
    }

    onSetFilter(newFilter);
  }

  render() {
    const { filter } = this.props;

    return (
      <View>
        <MKCheckbox
          checked={filter === SHOW_ACTIVE}
          onCheckedChange={this.handleToggleFilter}
          value="showActive"
        />
        <Text>Hide Completed Tasks</Text>
      </View>
    );
  }
}
