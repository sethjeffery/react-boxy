export const TURN_LEFT = 'TURN_LEFT'
export const TURN_RIGHT = 'TURN_RIGHT'
export const KEY_UP = 'KEY_UP'
export const KEY_DOWN = 'KEY_DOWN'
export const TICK = 'TICK'
export const UPDATE_PLAYER = 'UPDATE_PLAYER'
export const SET_STAGE_LEVEL = 'SET_STAGE_LEVEL'
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'
export const INITIAL = 'INITIAL'
export const PLAYING = 'PLAYING'
export const GAME_OVER = 'GAME_OVER'

export const turnLeft = () => {
  return {
    type: TURN_LEFT
  }
}

export const turnRight = () => {
  return {
    type: TURN_RIGHT
  }
}

export const tick = () => {
  return {
    type: TICK
  }
}

export const updatePlayer = props => {
  return {
    type: UPDATE_PLAYER,
    props: props
  }
}

export const keyUp = key => {
  return {
    type: KEY_UP,
    key: key
  }
}

export const keyDown = key => {
  return {
    type: KEY_DOWN,
    key: key
  }
}

export const setStageLevel = level => {
  return {
    type: SET_STAGE_LEVEL,
    level: level
  }
}

export const startGame = () => {
  return {
    type: START_GAME
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
}
