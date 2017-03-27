/* eslint-disable no-unused-vars */
import React from 'react'
import TabBar from '../TabBar'
import { shallow, mount } from 'enzyme'

const MockButton = () => {}

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
