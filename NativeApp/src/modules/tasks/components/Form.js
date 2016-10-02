import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { MKTextField } from 'react-native-material-kit';

const { func } = PropTypes;

export default class Form extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const value = this.refs.textInput.value;

    this.props.onSubmit(value);

    this.refs.textInput.value = '';
  }

  render() {
    return (
      <View>
        <MKTextField
          blurOnSubmit
          onSubmitEditing={this.handleSubmit}
          placeholder="Type to add new tasks"
          ref="textInput"
          returnKeyType="done"
        />
      </View>
    );
  }
}
