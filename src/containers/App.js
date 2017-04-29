import { connect } from 'react-redux';
import App from '../components/App';
import { startGame, endGame } from '../actions'

export default connect(
  function mapStateToProps(state) {
    return {
      gameState: state.app.state
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      startGame: () => dispatch(startGame()),
      endGame: () => dispatch(endGame())
    }
  }
)(App)
