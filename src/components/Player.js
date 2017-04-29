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
        // SPACE bar jumps! (If we are on the ground, that is.)
        if(this.onGround) {
          this.onGround = 0
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

    // Reduce onGround tracker from 10 back to 0. After 10 frames without
    // colliding with the ground, we can assume we are "in the air".
    this.onGround = Math.max((this.onGround || 0) - 1, 0)

    // Perform movement
    this.move(body)
    this.moveStage()
    this.props.updatePlayer({ position: body.position, angle: body.angle })

    // At bottom of screen, fall through by filtering out collisions
    // and disallowing the player to jump any further
    if(body.position.y > 580) {
      body.collisionFilter = { mask: 1 }
      this.onGround = 0
    }

    // After falling, game over!
    if(body.position.y > 800) {
      this.props.endGame()
    }
  }

  moveStage = () => {
    // Move the stage down by a speed factor dependent on:
    //  - If player approaches top of screen, stage moves to compensate
    //  - As level increases, stage moves faster
    const body = this.body
    const { engine, store } = this.context
    const stageLevel = store.getState().app.level.stageLevel
    const stageDY = stageLevel / 2000 + (body.position.y > 200 ? 0 : (200 - body.position.y) / 50)
    this.props.setStageLevel(stageLevel + stageDY)
    Matter.Composite.translate(engine.world, { x: 0, y: stageDY })
  }

  move = body => {
    // Apply rolling force to player if LEFT or RIGHT keys are held down.
    // If we are on the ground, we can roll faster.
    // If in the air, we can turn a little but not too much.
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
    // If player is colliding with a level platform and is ABOVE it, then we are "on the ground"
    // meaning we can jump, and can move left/right faster than while in air.
    if (pairs.some(pair => {
      return (pair.bodyA === this.body && pair.bodyA.position.y < pair.bodyB.position.y) ||
        (pair.bodyB === this.body && pair.bodyB.position.y < pair.bodyA.position.y)
    })) {
      // onGround is a numeric that increases up to a value of 10. This is because while
      // we are rolling on the ground there are moments when we are "in the air"
      // but we should only count after a reasonable length of time (10 frames).
      this.onGround = Math.min((this.onGround || 0) + 3, 10)
    }
  }

  componentDidMount() {
    // Listen for game loop events, collision events, and key presses.
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update)
    Matter.Events.on(this.context.engine, 'collisionStart', this.resting)
    Matter.Events.on(this.context.engine, 'collisionActive', this.resting)
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  componentWillUnmount() {
    // Release events and Matter body object.
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    Matter.Events.off(this.context.engine, 'collisionStart', this.resting)
    Matter.Events.off(this.context.engine, 'collisionActive', this.resting)
    document.removeEventListener('keydown', this.onKeyDown, false)
    World.remove(this.context.engine.world, this.body);
  }

  render() {
    return <span></span>
  }
}
