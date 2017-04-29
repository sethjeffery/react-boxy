import React, { Component } from 'react'
import Matter, { World, Bodies } from 'matter-js'
import PropTypes from 'prop-types'
import BoxSprite from './box-sprite.png'

const SPACE = 32
const CURSOR_LEFT = 37
const CURSOR_RIGHT = 39

export default class Player extends Component {
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
    store: PropTypes.object
  }

  static propTypes = {
    player: PropTypes.object,
    pressing: PropTypes.object,
    updatePlayer: PropTypes.func,
    endGame: PropTypes.func,
    setStageLevel: PropTypes.func,
  }

  constructor(props, context) {
    super(props)

    const { x, y } = props.player.position
    const { engine } = context

    this.body = Bodies.rectangle(x, y, 40, 40, {
      chamfer: {radius: 2},
      frictionAir: 0.045,
      friction: 1,
      mass: 8,
    })

    this.body.render.sprite = {
      texture: BoxSprite,
      xOffset: 0.5,
      yOffset: 0.5,
      xScale: 0.5,
      yScale: 0.5,
    }

    World.addBody(engine.world, this.body)
  }

  onKeyDown = e => {
    const body = this.body
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

  isKeyDown = key => {
    return !!this.props.pressing[key]
  }

  update = () => {
    const body = this.body
    this.onGround = Math.max((this.onGround || 0) - 1, 0)
    this.move(body)
    this.moveStage()
    this.props.updatePlayer({ position: body.position, angle: body.angle })
    if(body.position.y > 580) {
      this.props.endGame()
    }
  }

  moveStage = () => {
    const body = this.body
    const { engine, store } = this.context
    const stageLevel = store.getState().app.level.stageLevel
    const stageDY = stageLevel / 2000 + (body.position.y > 200 ? 0 : (200 - body.position.y) / 50)
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
      return (pair.bodyA === this.body && pair.bodyA.position.y < pair.bodyB.position.y) ||
        (pair.bodyB === this.body && pair.bodyB.position.y < pair.bodyA.position.y)
    })) {
      this.onGround = Math.min((this.onGround || 0) + 3, 10)
    }
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update)
    Matter.Events.on(this.context.engine, 'collisionStart', this.resting)
    Matter.Events.on(this.context.engine, 'collisionActive', this.resting)
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    Matter.Events.off(this.context.engine, 'collisionStart', this.resting)
    Matter.Events.off(this.context.engine, 'collisionActive', this.resting)
    document.removeEventListener('keydown', this.onKeyDown, false)
    World.remove(this.context.engine.world, this.body);
  }

  render() {
    return (
      <span></span>
    )
  }
}
