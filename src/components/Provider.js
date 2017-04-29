import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import reducers from '../reducers'
import PropTypes from 'prop-types'

class Provider extends Component {
  render() {
    return (
      <ReduxProvider store={this.props.store}>
        {this.props.children}
      </ReduxProvider>
    )
  }
}

Provider.defaultProps = {
  store: createStore(reducers)
}

Provider.propTypes = {
  store: PropTypes.object.isRequired
}

export default Provider
