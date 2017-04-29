import React, { Component } from 'react';
import { Body, World as MatterWorld } from 'react-game-kit'
import PropTypes from 'prop-types'
import Player from '../containers/Player'
import Matter from 'matter-js'
import Keyboard from '../containers/Keyboard'

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
    Matter.Events.on(this.world.engine, 'afterUpdate', this.tick);

    this.render = Matter.Render.create({
      element: document.getElementById('Game'),
      engine: this.world.engine,
      options: {
        ...dimensions,
        showAngleIndicator: false
      }
    })

    Matter.Render.run(this.render)
  }

  componentWillUnmount() {
    Matter.Events.off(this.world.engine, 'afterUpdate', this.tick);
  }

  tick() {

  }

  render() {
    const level = this.context.store.getState().app.level
    return (
      <MatterWorld gravity={{ x: 0, y: 2 }} ref={ref => {this.world = ref}}>
        <Player />
        <Keyboard />
        { level.platforms.map(platform => (
          <Body
            key={platform.id}
            args={platform.args}
            collisionFilter={{ group: 1}}
            isStatic
            chamfer={{radius: 5}}
            friction={1}
            >
              <div className='Floor'></div>
          </Body>
        ))}
      </MatterWorld>
    )
  }
}
