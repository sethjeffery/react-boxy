import { connect } from 'react-redux';
import Platforms from '../components/Platforms';
import { tick } from '../actions'

export default connect(
  function mapStateToProps(state) {
    return {
      platforms: state.app.level.platforms
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      tick: () => dispatch(tick())
    }
  }
)(Platforms)
