import { connect } from 'react-redux';
import Component from '../components/Player';
import { updatePlayer, setStageLevel, endGame } from '../actions'

export default connect(
  function mapStateToProps(state) {
    return {
      player: state.app.player,
      pressing: state.app.keyboard.pressing
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      updatePlayer: props => dispatch(updatePlayer(props)),
      setStageLevel: level => dispatch(setStageLevel(level)),
      endGame: () => dispatch(endGame())
    }
  }
)(Component)
