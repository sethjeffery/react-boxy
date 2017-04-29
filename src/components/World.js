import React, { Component } from 'react';
import { World as MatterWorld } from 'react-game-kit'
import PropTypes from 'prop-types'
import Player from '../containers/Player'
import Matter from 'matter-js'
import Keyboard from '../containers/Keyboard'
import Platforms from '../containers/Platforms'

import './App.css'

const dimensions = {
  width: 800,
  height: 600,
}

export default class World extends Component {
  static contextTypes = {
    stage: PropTypes.object,
    store: PropTypes.object
  }

  componentDidMount() {
    this.render = Matter.Render.create({
      element: document.getElementById('world'),
      engine: this.world.engine,
      options: {
        ...dimensions,
        showAngleIndicator: false,
        wireframes: false
      }
    })

    Matter.Render.run(this.render)
  }

  render() {
    return (
      <div id="world">
        <MatterWorld gravity={{ x: 0, y: 2 }} ref={ref => {this.world = ref}}>
          <Player />
          <Keyboard />
          <Platforms />
        </MatterWorld>
      </div>
    )
  }
}
