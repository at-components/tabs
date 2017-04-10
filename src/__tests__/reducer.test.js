import reducer, { actions, selectors } from '../reducer'

describe('reducer', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  test('should initlize tab bar', () => {
    const action = actions.init({
      kind: 'Testing',
      index: 0,
    })
    expect(reducer({}, action)).toEqual({
      'Testing': 0,
    })
  })

  test('should update index on select', () => {
    const action = actions.init({
      kind: 'Testing',
      index: 2,
    })
    expect(reducer({
      'Testing': 0,
    }, action)).toEqual({
      'Testing': 2,
    })
  })
})

const makeStore = tabs => ({
  components: {
    tabs,
  },
})

describe('selectors', () => {
  describe('getActiveIndexById', () => {
    test('should return a tab if its initilized', () => {
      const state = makeStore({ Header: 2 })
      expect(
        selectors.getActiveIndexById(state, 'Header'),
      ).toBe(2)
    })

    test('should return undefined if it doesnt exist', () => {
      const state = makeStore({})
      expect(
        selectors.getActiveIndexById(state, 'Header'),
      ).toBeUndefined()
    })
  })
})
