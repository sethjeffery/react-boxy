import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit'
import PropTypes from 'prop-types'
import Matter from 'matter-js'
import World from '../containers/World'
import Score from '../containers/Score'
import { INITIAL, PLAYING, GAME_OVER } from '../actions'

import './App.css'

const dimensions = {
  width: Math.min(document.documentElement.clientWidth, 800),
  height: Math.min(document.documentElement.clientHeight, 600),
}

export default class App extends Component {
  render() {
    console.log(this.props)
    switch(this.props.gameState) {
      case INITIAL:
        return (
          <div className='Game canvas'>
            <button onClick={this.props.startGame}>PLAY THE GAME</button>
          </div>
        )
      case GAME_OVER:
        return (
          <div className='Game canvas'>
            <div className='info'>
              Game over, man.
            </div>
            <Score />
            <button onClick={this.props.startGame}>TRY AGAIN</button>
          </div>
        )
      default:
        return (
          <div className='Game'>
            <Loop style={{ width: 'auto', height: 'auto' }}>
              <div className='info'>
                Cursor keys to move. SPACE to jump.
              </div>
              <div style={dimensions} id="Game">
                <Stage>
                  <World />
                </Stage>
              </div>
              <Score />
            </Loop>
          </div>
        )
    }
  }
}
