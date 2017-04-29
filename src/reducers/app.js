import { combineReducers } from 'redux'
import {
  TURN_LEFT,
  TURN_RIGHT,
  UPDATE_PLAYER,
  KEY_DOWN,
  KEY_UP,
  SET_STAGE_LEVEL,
  START_GAME,
  END_GAME,
  INITIAL,
  PLAYING,
  GAME_OVER
} from '../actions'

const playerDefault = {
  position: {
    x: 400,
    y: 299
  },
  angle: 0,
  isJumping: false
}

const initialLevel = {
  stageLevel: 0,
  platforms: [{
    id: 0,
    args: [400, 350, 500, 50]
  }]
}

const createLevel = () => {
  let level = { ...initialLevel }
  for(let i=1; i<50; i++) {
    const x = (i == 0 ? 0 : Math.random() * 200)
    const width = 100 + Math.random() * 100
    level.platforms.push({
      id: i*2,
      args: [450 + (i == 0 ? 0 : Math.random() * 200), level.platforms[0].args[1] - i * 100, width, 10 ]
    })
    level.platforms.push({
      id: i*2+1,
      args: [350 - (i == 0 ? 0 : Math.random() * 200), level.platforms[0].args[1] - i * 100 - 50, width, 10 ]
    })
  }
  return level
}

const player = (state = playerDefault, action) => {
  switch(action.type) {
    case START_GAME:
      return { ...playerDefault }
    case TURN_LEFT:
      return { ...state, angle: state.angle - 10 }
    case TURN_RIGHT:
      return { ...state, angle: state.angle + 10 }
    case UPDATE_PLAYER:
      const props = action.props
      return { ...state, ...props }
    default:
      return state
  }
}

const keyboard = (state = { pressing: {}}, action) => {
  switch(action.type) {
    case KEY_DOWN:
      return { ...state, pressing: { ...state.pressing, [action.key]: true } }
    case KEY_UP:
      let pressing = state.pressing
      delete pressing[action.key]
      return { ...state, pressing }
    default:
      return state
  }
}

const level = (state = initialLevel, action) => {
  switch(action.type) {
    case START_GAME:
      return createLevel()
    case SET_STAGE_LEVEL:
      return { ...state, stageLevel: action.level }
    default:
      return state
  }
}

const state = (state = INITIAL, action) => {
  switch(action.type) {
    case START_GAME:
      return PLAYING
    case END_GAME:
      return GAME_OVER
    default:
      return state
  }
}

export default combineReducers({ player, keyboard, level, state })