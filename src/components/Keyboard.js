import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Keyboard extends Component {
  static propTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  }

  componentDidMount() {
    document.addEventListener('keydown', e => this.props.onKeyDown(e), false)
    document.addEventListener('keyup', e => this.props.onKeyUp(e), false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', e => this.props.onKeyDown(e), false)
    document.removeEventListener('keyup', e => this.props.onKeyUp(e), false)
  }

  render() {
    // component does not render
    return null
  }
}
