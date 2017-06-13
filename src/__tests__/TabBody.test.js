// @flow
import React from 'react'
import { TabBody } from '../TabBody'
import { shallow } from 'enzyme'

describe('children', () => {
  test('should display the selected tab', () => {
    const rendered = shallow(
      <TabBody selectedTab="baz">
        <div name="foo">first</div>
        <div name="bar">second</div>
        <div name="baz">third</div>
      </TabBody>,
    )
    expect(rendered.html()).toEqual('<div name="baz">third</div>')
  })

  test('should display null if no child has matching name', () => {
    const rendered = shallow(
      <TabBody selectedTab="orange">
        <div>first</div>
        <div>second</div>
        <div>third</div>
      </TabBody>,
    )
    expect(rendered.children()).toHaveLength(0)
    expect(rendered.html()).toEqual(null)
  })
})
