// @flow
import React from 'react'
import { ConnectedTabBar } from '../TabBar'
import reducer, { actions, selectors } from '../reducer'
import { shallow, mount } from 'enzyme'

const MockButton = ({ onSelect }) => (
  <div onClick={ onSelect } className="button">Button</div>
)

describe('onMount', () => {
  test('calls 0 as default', () => {
    const handleMount = jest.fn()
    mount(<ConnectedTabBar onMount={ handleMount } />)
    expect(handleMount).toBeCalledWith(0)
  })
  test('calls 1 when selectedIndex = 1', () => {
    const handleMount = jest.fn()
    mount(<ConnectedTabBar selectedIndex={ 1 } onMount={ handleMount } />)
    expect(handleMount).toBeCalledWith(1)
  })
})

describe('children', () => {
  test('should get passed down', () => {
    const rendered = shallow(
      <ConnectedTabBar>
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton)).toHaveLength(1)
  })

  test('should get onSelect', () => {
    const rendered = mount(
      <ConnectedTabBar>
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('onSelect')
  })

  test('should know if they are active', () => {
    const rendered = mount(
      <ConnectedTabBar activeIndex={ 0 }>
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('active', true)
  })

  test('should have second child active', () => {
    const rendered = mount(
      <ConnectedTabBar activeIndex={ 1 }>
        <MockButton />
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('active', false)
    expect(rendered.find(MockButton).last().props()).toHaveProperty('active', true)
  })
})

describe('onSelect', () => {
  test('should get called when onSelect gets called', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <ConnectedTabBar id="TestingSelect" onSelect={ handleSelect }>
        <MockButton />
      </ConnectedTabBar>,
    )
    rendered.find('.button').simulate('click')
    expect(handleSelect).toBeCalledWith({ id: 'TestingSelect', index: 0 })
  })

  test('curry should relay the right index', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <ConnectedTabBar id="TestingSelect" onSelect={ handleSelect }>
        <MockButton />
        <MockButton />
      </ConnectedTabBar>,
    )
    rendered.find('.button').last().simulate('click')
    expect(handleSelect).toBeCalledWith({ id: 'TestingSelect', index: 1 })
  })
})

describe('reducer', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  test('should initlize tab bar', () => {
    const action = actions.init({
      id: 'Testing',
      index: 0,
    })
    expect(reducer({}, action)).toEqual({
      'Testing': 0,
    })
  })

  test('should update index on select', () => {
    const action = actions.init({
      id: 'Testing',
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
        selectors.getActiveIndexById(state, { id: 'Header' }),
      ).toBe(2)
    })

    test('should return undefined if it doesnt exist', () => {
      const state = makeStore({})
      expect(
        selectors.getActiveIndexById(state, { id: 'Header' }),
      ).toBeUndefined()
    })
  })
})
