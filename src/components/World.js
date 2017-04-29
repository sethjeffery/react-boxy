import React, { Component } from 'react';
import { World as MatterWorld } from 'react-game-kit'
import PropTypes from 'prop-types'
import Player from '../containers/Player'
import Keyboard from '../containers/Keyboard'
import Platforms from '../containers/Platforms'
import Render from './Render'
import './App.css'

export default class World extends Component {
  static contextTypes = {
    stage: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    return (
      <MatterWorld gravity={{ x: 0, y: 2 }}>
        <Player />
        <Keyboard />
        <Platforms />
        <Render showAngleIndicator={false} wireframes={false} />
      </MatterWorld>
    )
  }
}
