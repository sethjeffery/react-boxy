import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Provider from './Provider'
import { World } from 'react-game-kit'

export default class FakeWorld extends Component {

  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
  }

  static childContextTypes = {
    loop: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.loop = {
      subscribe: () => {},
      unsubscribe: () => {}
    }
  }

  getChildContext() {
    return { loop: this.loop }
  }

  render() {
    return (
      <Provider>
        <World>
          { this.props.children }
        </World>
      </Provider>
    )
  }
}
