import React from 'react'
import ReactDOM from 'react-dom'
import Player from './Player'
import World from './FakeWorld'

describe('Player', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <World>
        <Player
          player={{position: { x: 0, y: 0 }}}
          pressing={{}}
          setStageLevel={() => {}}
          updatePlayer={() => {}}
          />
      </World>
    , document.createElement('div'))
  })
})
