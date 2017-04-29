import React from 'react'
import ReactDOM from 'react-dom'
import Keyboard from './Keyboard'

describe('Platforms', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <Keyboard onKeyDown={() => {}} onKeyUp={() => {}} />
    , document.createElement('div'))
  })
})
