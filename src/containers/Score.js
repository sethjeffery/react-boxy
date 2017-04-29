import { connect } from 'react-redux';
import Score from '../components/Score';
import { updatePlayer, setStageLevel } from '../actions'

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
