// @flow
import React from 'react'
import { ConnectedTabBar } from '../TabBar'
import { shallow, mount } from 'enzyme'

const MockButton = ({ onSelect }) => (
  <div onClick={ onSelect } className="button">Button</div>
)

const requiredProps = {
  kind: 'test',
  selectedIndex: 0,
  activeIndex: 0,
  onMount: () => {},
  onSelect: () => {},
}

describe('onMount', () => {
  test('calls 0 as default', () => {
    const handleMount = jest.fn()
    mount(
      <ConnectedTabBar
        { ...requiredProps }
        onMount={ handleMount }
      />,
    )
    expect(handleMount).toBeCalledWith({
      kind: 'test',
      index: 0,
    })
  })
  test('calls 1 when selectedIndex = 1', () => {
    const handleMount = jest.fn()
    mount(
      <ConnectedTabBar
        { ...requiredProps }
        selectedIndex={ 1 }
        onMount={ handleMount }
      />,
    )
    expect(handleMount).toBeCalledWith({
      kind: 'test',
      index: 1,
    })
  })
})

describe('children', () => {
  test('should get passed down', () => {
    const rendered = shallow(
      <ConnectedTabBar { ...requiredProps }>
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton)).toHaveLength(1)
  })

  test('should get onSelect', () => {
    const rendered = mount(
      <ConnectedTabBar { ...requiredProps }>
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('onSelect')
  })

  test('should know if they are active', () => {
    const rendered = mount(
      <ConnectedTabBar { ...requiredProps } activeIndex={ 0 }>
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('active', true)
  })

  test('should have second child active', () => {
    const rendered = mount(
      <ConnectedTabBar { ...requiredProps } activeIndex={ 1 }>
        <MockButton />
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('active', false)
    expect(rendered.find(MockButton).last().props()).toHaveProperty('active', true)
  })

  test('should not count undefined or null children', () => {
    const rendered = mount(
      <ConnectedTabBar { ...requiredProps } activeIndex={ 1 }>
        <MockButton />
        <MockButton />
        { undefined }
        { null }
      </ConnectedTabBar>,
    )
    expect(rendered.children()).toHaveLength(2)
  })

  test('should skip undefined or null children as active', () => {
    const rendered = mount(
      <ConnectedTabBar { ...requiredProps }>
        { undefined }
        { null }
        <MockButton />
      </ConnectedTabBar>,
    )
    expect(rendered.find(MockButton).props()).toHaveProperty('active', true)
  })
})

describe('onSelect', () => {
  test('should get called when onSelect gets called', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <ConnectedTabBar
        { ...requiredProps }
        kind="TestingSelect"
        onSelect={ handleSelect }
      >
        <MockButton name="home" />
      </ConnectedTabBar>,
    )
    rendered.find('.button').simulate('click')
    expect(handleSelect).toBeCalledWith({ kind: 'TestingSelect', name: 'home', index: 0 })
  })

  test('curry should relay the right index', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <ConnectedTabBar
        { ...requiredProps }
        kind="TestingSelect"
        onSelect={ handleSelect }
      >
        <MockButton name="home" />
        <MockButton name="contact" />
      </ConnectedTabBar>,
    )
    rendered.find('.button').last().simulate('click')
    expect(handleSelect).toBeCalledWith({ kind: 'TestingSelect', name: 'contact', index: 1 })
  })
})
