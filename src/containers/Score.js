import { connect } from 'react-redux';
import Score from '../components/Score';

export default connect(
  function mapStateToProps(state) {
    return {
      score: state.app.level.stageLevel
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
    }
  }
)(Score)
