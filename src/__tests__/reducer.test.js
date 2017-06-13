import reducer, { actions, selectors } from '../reducer'

describe('reducer', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  test('should update on select', () => {
    const action = actions.select({
      kind: 'testing',
      name: 'amount',
    })

    expect(reducer({
      'testing': 'home',
    }, action)).toEqual({
      'testing': 'amount',
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
      const state = makeStore({ header: 'about' })
      expect(
        selectors.getSelectedTabByKind(state, 'header'),
      ).toEqual('about')
    })

    test('should return undefined if it doesnt exist', () => {
      const state = makeStore({})
      expect(
        selectors.getSelectedTabByKind(state, 'header'),
      ).toEqual(undefined)
    })
  })
})
