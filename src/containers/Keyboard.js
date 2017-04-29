import { connect } from 'react-redux';
import Component from '../components/Keyboard';
import { keyDown, keyUp } from '../actions'

export default connect(
  undefined,
  function mapDispatchToProps(dispatch) {
    return {
      onKeyDown: e => dispatch(keyDown(e.which)),
      onKeyUp: e => dispatch(keyUp(e.which))
    }
  }
)(Component)
