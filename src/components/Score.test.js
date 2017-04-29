import React from 'react'
import ReactDOM from 'react-dom'
import Score from './Score'

describe('Platforms', () => {
  it('renders without crashing', () => {
    ReactDOM.render(
      <Score score={100} />
    , document.createElement('div'))
  })
})
