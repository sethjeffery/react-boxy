import React from 'react'
import ReactDOM from 'react-dom'
import Platforms from './Platforms'
import World from './FakeWorld'

describe('Platforms', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <World>
        <Platforms platforms={[ { args: [0, 0, 100, 100] } ]} />
      </World>
    , document.createElement('div'))
  })
})
