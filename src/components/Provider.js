import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import reducers from '../reducers'
import PropTypes from 'prop-types'

export default class Provider extends Component {
  static defaultProps = {
    store: createStore(reducers)
  }

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    return (
      <ReduxProvider store={this.props.store}>
        {this.props.children}
      </ReduxProvider>
    )
  }
}
