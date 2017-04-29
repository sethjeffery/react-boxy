import { connect } from 'react-redux';
import Platforms from '../components/Platforms';

export default connect(
  function mapStateToProps(state) {
    return {
      platforms: state.app.level.platforms
    }
  },
  function mapDispatchToProps(state) {
    return {}
  }
)(Platforms)
