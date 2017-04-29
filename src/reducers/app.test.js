import reducer from './app';

const initialKeyboard = { pressing: {} }
const initialLevel    = { platforms: [{ args: [400, 550, 500, 50] }], stageLevel: 0 }
const initialPlayer   = { angle: 0, position: { x: 400, y: 499 } }

describe('DEFAULT', () => {
  it('starts with default state', () => {
    expect(reducer(undefined, { type: 'DEFAULT' })).toEqual({
      keyboard: initialKeyboard,
      level:    initialLevel,
      player:   initialPlayer,
      state:    "INITIAL"
    })
  })

  it('returns same state as before', () => {
    const initialState = { keyboard: 'a', level: 'b', player: 'c', state: 'd' }
    expect(reducer(initialState, { type: 'DEFAULT' })).toEqual(initialState)
  })
})

describe('START_GAME', () => {
  it('starts game', () => {
    expect(reducer(undefined, { type: 'START_GAME' }).state).toEqual('PLAYING')
  })

  it('creates a new level', () => {
    const newLevel = reducer({ level: 'another' }, { type: 'START_GAME' }).level
    expect(newLevel.platforms[0]).toEqual(initialLevel.platforms[0])
    expect(newLevel.stageLevel).toEqual(0)
    expect(newLevel.platforms.length).toEqual(99)
  })

  it('resets player position', () => {
    expect(reducer({ player: 'another' }, { type: 'START_GAME' }).player).toEqual(initialPlayer)
  })
})

describe('END_GAME', () => {
  it('ends game', () => {
    expect(reducer(undefined, { type: 'END_GAME' }).state).toEqual('GAME_OVER')
  })
})

describe('SET_STAGE_LEVEL', () => {
  it('sets the level stageLevel', () => {
    expect(reducer(undefined, { type: 'SET_STAGE_LEVEL', level: 10 }).level.stageLevel).toEqual(10)
  })
})

describe('KEY_DOWN', () => {
  it('sets the keyboard key state', () => {
    expect(reducer(undefined, { type: 'KEY_DOWN', key: 32 }).keyboard).toEqual({ pressing: { '32': true } })
  })
})

describe('KEY_UP', () => {
  it('removes the keyboard key state', () => {
    const firstState = reducer(undefined, { type: 'KEY_DOWN', key: 32 })
    expect(reducer(firstState, { type: 'KEY_UP', key: 32 }).keyboard).toEqual({ pressing: {} })
  })
})

describe('UPDATE_PLAYER', () => {
  it('updates the player state', () => {
    const action = { type: 'UPDATE_PLAYER', props: { position: { x: 100, y: 100 }} }
    expect(reducer(undefined, action).player).toEqual({ angle: 0, position: { x: 100, y: 100 } })
  })
})
