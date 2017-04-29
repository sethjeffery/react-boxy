import { updatePlayer, setStageLevel, keyUp, keyDown, startGame, endGame } from './index';

describe('updatePlayer', () => {
  it('generates an UPDATE_PLAYER action', () => {
    expect(updatePlayer({ foo: 'bar' })).toEqual({
      type: 'UPDATE_PLAYER',
      props: {
        foo: 'bar'
      }
    })
  })
})

describe('setStageLevel', () => {
  it('generates a SET_STAGE_LEVEL action', () => {
    expect(setStageLevel(100)).toEqual({
      type: 'SET_STAGE_LEVEL',
      level: 100
    })
  })
})

describe('keyUp', () => {
  it('generates a KEY_UP action', () => {
    expect(keyUp(32)).toEqual({
      type: 'KEY_UP',
      key: 32
    })
  })
})

describe('keyDown', () => {
  it('generates a KEY_DOWN action', () => {
    expect(keyDown(32)).toEqual({
      type: 'KEY_DOWN',
      key: 32
    })
  })
})

describe('startGame', () => {
  it('generates a START_GAME action', () => {
    expect(startGame()).toEqual({
      type: 'START_GAME'
    })
  })
})

describe('endGame', () => {
  it('generates a END_GAME action', () => {
    expect(endGame()).toEqual({
      type: 'END_GAME'
    })
  })
})
