import React, { Component } from 'react'
import Matter from 'matter-js'
import PropTypes from 'prop-types'
import { Body } from 'react-game-kit'

const SPACE = 32
const CURSOR_LEFT = 37
const CURSOR_RIGHT = 39

export default class Player extends Component {
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
    store: PropTypes.object
  }

  onKeyDown = e => {
    const { body } = this.body
    switch(e.which) {
      case SPACE:
        if(this.onGround) {
          Matter.Body.applyForce(
            body,
            { x: body.position.x, y: body.position.y },
            { x: 0, y: -0.6 },
          )
        }
        return
      default:
        return
    }
  }

  onKeyUp = e => {

  }

  isKeyDown = key => {
    return !!this.props.pressing[key]
  }

  update = () => {
    const { body } = this.body
    const { engine } = this.context
    this.onGround = Math.max((this.onGround || 0) - 1, 0)
    this.move(body)
    this.moveStage()
    this.props.updatePlayer({ position: body.position, angle: body.angle })
    if(body.position.y > 600) {
      this.props.endGame()
    }
  }

  moveStage = () => {
    const { body } = this.body
    const { engine, store } = this.context
    const stageLevel = store.getState().app.level.stageLevel
    const stageDY = stageLevel / 2000 + .2 + (body.position.y > 200 ? 0 : (200 - body.position.y) / 50)
    this.props.setStageLevel(stageLevel + stageDY)
    Matter.Composite.translate(engine.world, { x: 0, y: stageDY })
  }

  move = body => {
    if (this.isKeyDown(CURSOR_LEFT)) {
      Matter.Body.applyForce(
        body,
        { x: body.position.x, y: body.position.y - 10 },
        { x: (this.onGround ? -.015 : -.005), y: 0 },
      )
    }
    if (this.isKeyDown(CURSOR_RIGHT)) {
      Matter.Body.applyForce(
        body,
        { x: body.position.x, y: body.position.y - 10 },
        { x: this.onGround ? .015 : .005, y: 0 },
      )
    }
  }

  resting = ({ pairs }) => {
    if (pairs.some(pair => {
      return (pair.bodyA == this.body.body && pair.bodyA.position.y < pair.bodyB.position.y) ||
        (pair.bodyB == this.body.body && pair.bodyB.position.y < pair.bodyA.position.y)
    })) {
      this.onGround = Math.min((this.onGround || 0) + 3, 10)
    }
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update)
    Matter.Events.on(this.context.engine, 'collisionStart', this.resting)
    Matter.Events.on(this.context.engine, 'collisionActive', this.resting)
    document.addEventListener('keydown', e => this.onKeyDown(e), false)
    document.addEventListener('keyup', e => this.onKeyUp(e), false)
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    Matter.Events.off(this.context.engine, 'collisionStart', this.resting)
    Matter.Events.off(this.context.engine, 'collisionActive', this.resting)
    document.removeEventListener('keydown', e => this.onKeyDown(e), false)
    document.removeEventListener('keyup', e => this.onKeyUp(e), false)
  }

  wrapperStyles({ x, y, angle }) {
    return {
      position: 'absolute',
      width: '50px',
      height: '50px',
      transform: `translateX(${x}px) translateY(${y}px) rotate(${angle}deg)`,
      transformOrigin: 'center'
    }
  }

  render() {
    const { x, y } = this.props.player.position
    const angle = this.props.player.angle

    return (
      <Body
        args={[x, y, 40, 40]}
        ref={(b) => { this.body = b; }}
        mass={9}
        collisionFilter={{ group: 1 }}
        friction={1}
        frictionAir={0.05}
        chamfer={{radius: 5}}
      >
        <div className='Player'></div>
      </Body>
    )
  }
}
