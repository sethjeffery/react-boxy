import { connect } from 'react-redux';
import World from '../components/World';
import { tick } from '../actions'

export default connect(
  function mapStateToProps(state) {
    return {
      
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      tick: () => dispatch(tick())
    }
  }
)(World)
