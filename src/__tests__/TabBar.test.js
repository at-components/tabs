/* eslint-disable no-unused-vars */
import React from 'react'
import TabBar from '../TabBar'
import { shallow, mount } from 'enzyme'

const MockButton = ({ onSelectTab }) => (
  <div onClick={ onSelectTab } className="button">Button</div>
)

describe('onMount', () => {
  test('calls 0 as default', () => {
    const handleMount = jest.fn()
    const rendered = mount(<TabBar onMount={ handleMount } />)
    expect(handleMount).toBeCalledWith(0)
  })
  test('calls 1 when selectedIndex = 1', () => {
    const handleMount = jest.fn()
    const rendered = mount(<TabBar selectIndex={ 1 } onMount={ handleMount } />)
    expect(handleMount).toBeCalledWith(1)
  })
})

describe('children', () => {
  test('should get passed down', () => {
    const rendered = shallow(
      <TabBar>
        <MockButton />
      </TabBar>,
    )
    expect(rendered.find(MockButton)).toHaveLength(1)
  })
})

describe('onSelect', () => {
  test('should get called when onSelectTab gets called', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <TabBar name="TestingSelect" onSelect={ handleSelect }>
        <MockButton />
      </TabBar>,
    )
    rendered.find('.button').simulate('click')
    expect(handleSelect).toBeCalledWith({ name: 'TestingSelect', index: 0 })
  })

  test('curry should relay the right index', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <TabBar name="TestingSelect" onSelect={ handleSelect }>
        <MockButton />
        <MockButton />
      </TabBar>,
    )
    rendered.find('.button').last().simulate('click')
    expect(handleSelect).toBeCalledWith({ name: 'TestingSelect', index: 1 })
  })
})