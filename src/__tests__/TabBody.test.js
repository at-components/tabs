// @flow
import React from 'react'
import { ConnectedTabBody } from '../TabBody'
import { shallow } from 'enzyme'

describe('children', () => {
  test('should only display first child when activeIndex = 0', () => {
    const rendered = shallow(
      <ConnectedTabBody activeIndex={ 0 }>
        <div>first</div>
        <div>second</div>
        <div>third</div>
      </ConnectedTabBody>,
    )
    expect(rendered.html()).toEqual('<div>first</div>')
  })

  test('should display later child', () => {
    const rendered = shallow(
      <ConnectedTabBody activeIndex={ 2 }>
        <div>first</div>
        <div>second</div>
        <div>third</div>
      </ConnectedTabBody>,
    )
    expect(rendered.html()).toEqual('<div>third</div>')
  })

  test('should display null if no child at index', () => {
    const rendered = shallow(
      <ConnectedTabBody activeIndex={ 6 }>
        <div>first</div>
        <div>second</div>
        <div>third</div>
      </ConnectedTabBody>,
    )
    expect(rendered.children()).toHaveLength(0)
    expect(rendered.html()).toEqual(null)
  })
})