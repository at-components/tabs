/* eslint-disable no-unused-vars */
import React from 'react'
import { ConnectedTabBar } from '../TabBar'
import { shallow, mount } from 'enzyme'

const MockButton = ({ onSelectTab }) => (
  <div onClick={ onSelectTab } className="button">Button</div>
)

describe('onMount', () => {
  test('calls 0 as default', () => {
    const handleMount = jest.fn()
    const rendered = mount(<ConnectedTabBar onMount={ handleMount } />)
    expect(handleMount).toBeCalledWith(0)
  })
  test('calls 1 when selectedIndex = 1', () => {
    const handleMount = jest.fn()
    const rendered = mount(<ConnectedTabBar selectedIndex={ 1 } onMount={ handleMount } />)
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

  test('should get onSelectTab', () => {
    const rendered = mount(
      <ConnectedTabBar>
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('onSelectTab')
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
  test('should get called when onSelectTab gets called', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <ConnectedTabBar name="TestingSelect" onSelect={ handleSelect }>
        <MockButton />
      </ConnectedTabBar>,
    )
    rendered.find('.button').simulate('click')
    expect(handleSelect).toBeCalledWith({ name: 'TestingSelect', index: 0 })
  })

  test('curry should relay the right index', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <ConnectedTabBar name="TestingSelect" onSelect={ handleSelect }>
        <MockButton />
        <MockButton />
      </ConnectedTabBar>,
    )
    rendered.find('.button').last().simulate('click')
    expect(handleSelect).toBeCalledWith({ name: 'TestingSelect', index: 1 })
  })
})
