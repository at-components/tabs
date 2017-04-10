import reducer, { actions, selectors } from '../reducer'

describe('reducer', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  test('should initlize tab bar', () => {
    const action = actions.init({
      kind: 'Testing',
      name: 'home',
      index: 0,
    })
    expect(reducer({}, action)).toEqual({
      'Testing': {
        name: 'home',
        index: 0,
      },
    })
  })

  test('should update index on select', () => {
    const action = actions.init({
      kind: 'Testing',
      name: 'abount',
      index: 2,
    })
    expect(reducer({
      'Testing': {
        name: 'home',
        index: 0,
      },
    }, action)).toEqual({
      'Testing': {
        name: 'abount',
        index: 2,
      },
    })
  })
})

const makeStore = tabs => ({
  components: {
    tabs,
  },
})

describe('selectors', () => {
  describe('getActiveIndexByKind', () => {
    test('should return a tab if its initilized', () => {
      const state = makeStore({ Header: {
        name: 'about',
        index: 2,
      } })
      expect(
        selectors.getActiveIndexByKind(state, 'Header'),
      ).toBe(2)
    })

    test('should return undefined if it doesnt exist', () => {
      const state = makeStore({})
      expect(
        selectors.getActiveIndexByKind(state, 'Header'),
      ).toBeUndefined()
    })
  })
})
