// @flow
import React from 'react'
import { TabBar } from '../TabBar'
import { shallow, mount } from 'enzyme'

const MockButton = ({ onSelect }) => (
  <div onClick={ onSelect } className="button">Button</div>
)

const requiredProps = {
  kind: 'test',
  selectedTab: 'foo',
  onSelect: () => {},
}

describe('render', () => {
  test('fires onSelect for first tab by default', () => {
    const handleSelect = jest.fn()
    mount(
      <TabBar { ...requiredProps } selectedTab={ undefined } onSelect={ handleSelect }>
        <MockButton name="foo" />
      </TabBar>,
    )
    expect(handleSelect).toBeCalledWith({
      kind: 'test',
      name: 'foo',
    })
  })

  test('fires onSelect for first avaliable tab', () => {
    const handleSelect = jest.fn()
    mount(
      <TabBar { ...requiredProps } selectedTab={ undefined } onSelect={ handleSelect }>
        { null }
        <MockButton name="bar" />
      </TabBar>,
    )
    expect(handleSelect).toBeCalledWith({
      kind: 'test',
      name: 'bar',
    })
  })

  test('fires onSelect only once', () => {
    const handleSelect = jest.fn()
    mount(
      <TabBar { ...requiredProps } selectedTab={ undefined } onSelect={ handleSelect }>
        <MockButton name="foo" />
        <MockButton name="bar" />
      </TabBar>,
    )
    expect(handleSelect.mock.calls.length).toBe(1)
  })

  test('calls another tab when no selected tab and initilTab is set', () => {
    const handleSelect = jest.fn()
    mount(
      <TabBar
        { ...requiredProps }
        selectedTab={ undefined }
        initialTab="bar"
        onSelect={ handleSelect }
      >
        <MockButton name="foo" />
        <MockButton name="bar" />
      </TabBar>,
    )
    expect(handleSelect).toBeCalledWith({
      kind: 'test',
      name: 'bar',
    })
  })
})

describe('children', () => {
  test('should get passed down', () => {
    const rendered = shallow(
      <TabBar { ...requiredProps }>
        <MockButton />
      </TabBar>,
    )
    expect(rendered.find(MockButton)).toHaveLength(1)
  })

  test('should get onSelect', () => {
    const rendered = mount(
      <TabBar { ...requiredProps }>
        <MockButton />
      </TabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('onSelect')
  })

  test('nested should get onSelect', () => {
    const rendered = mount(
      <TabBar { ...requiredProps }>
        <div>
          <div>
            <MockButton />
          </div>
        </div>
      </TabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('onSelect')
  })

  test('should know if they are active', () => {
    const rendered = mount(
      <TabBar { ...requiredProps } selectedTab="foo">
        <MockButton name="foo" />
      </TabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('active', true)
  })

  test('should have second child active', () => {
    const rendered = mount(
      <TabBar { ...requiredProps } selectedTab="bar">
        <MockButton name="foo" />
        <MockButton name="bar" />
      </TabBar>,
    )
    expect(rendered.find(MockButton).first().props()).toHaveProperty('active', false)
    expect(rendered.find(MockButton).last().props()).toHaveProperty('active', true)
  })
})

describe('div', () => {
  test('should get any extra props', () => {
    const rendered = mount(
      <TabBar className="foo" style={{ color: 'red' }} />,
    )
    expect(rendered.html()).toEqual('<div class="foo" style="color: red;"></div>')
  })
})

describe('onSelect', () => {
  test('should get called when onSelect gets called', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <TabBar
        { ...requiredProps }
        kind="testing-select"
        onSelect={ handleSelect }
      >
        <MockButton name="home" />
      </TabBar>,
    )
    rendered.find('.button').simulate('click')
    expect(handleSelect).toBeCalledWith({ kind: 'testing-select', name: 'home' })
  })

  test('curry should relay the right tab name', () => {
    const handleSelect = jest.fn()
    const rendered = mount(
      <TabBar
        { ...requiredProps }
        kind="testing-select"
        onSelect={ handleSelect }
      >
        <MockButton name="home" />
        <MockButton name="contact" />
      </TabBar>,
    )
    rendered.find('.button').last().simulate('click')
    expect(handleSelect).toBeCalledWith({ kind: 'testing-select', name: 'contact' })
  })
})
