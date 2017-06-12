import reducer, { actions, selectors } from '../reducer'

describe('reducer', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  test('should update on select', () => {
    const action = actions.select({
      kind: 'Testing',
      name: 'amount',
    })

    expect(reducer({
      'Testing': {
        kind: 'Testing',
        name: 'home',
      },
    }, action)).toEqual({
      'Testing': {
        kind: 'Testing',
        name: 'amount',
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
  describe('getSelectedTabByKind', () => {
    test('should return a tab if its selected', () => {
      const state = makeStore({ Header: {
        kind: 'Header',
        name: 'about',
      } })
      expect(
        selectors.getSelectedTabByKind(state, 'Header'),
      ).toEqual({
        kind: 'Header',
        name: 'about',
      })
    })

    test('should return undefined if it doesnt exist', () => {
      const state = makeStore({})
      expect(
        selectors.getSelectedTabByKind(state, 'Header'),
      ).toEqual({})
    })
  })
})
