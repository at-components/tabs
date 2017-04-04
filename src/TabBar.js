// @flow
import React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from './reducer'
import type { Store, SelectParams, InitParams } from './reducer'

type PresentationalTabBarProps = {
  id: string,
  children?: React.Children,
  activeIndex: number,
  onSelect: (SelectParams) => void
}

const PresentationalTabBar = ({ id, children, activeIndex, onSelect }:
  PresentationalTabBarProps) => {
  const handleSelect = data => () => onSelect(data)
  const tabs = []
  React.Children.forEach(children, child => child && tabs.push(child))

  return (
    <div style={{ display: 'flex' }}>
      { tabs.map((child, index: number) =>
        React.cloneElement(child, {
          // eslint-disable-next-line react/no-array-index-key
          key: `${ child.key }-${ index }`,
          onSelect: handleSelect({ id, index }),
          active: index === activeIndex,
        }),
      ) }
    </div>
  )
}

type ConnectedTabBarProps = PresentationalTabBarProps & {
  selectedIndex: number,
  onMount: (InitParams) => void,
}

export class ConnectedTabBar extends React.Component {
  props: ConnectedTabBarProps

  static defaultProps = {
    selectedIndex: 0,
    onMount: () => {},
  }

  componentDidMount() {
    this.props.onMount({
      id: this.props.id,
      index: this.props.selectedIndex,
    })
  }

  render() {
    return (
      <PresentationalTabBar
        id={ this.props.id }
        index={ 1 }
        onSelect={ this.props.onSelect }
        activeIndex={ this.props.activeIndex }
      >
        { this.props.children }
      </PresentationalTabBar>
    )
  }
}

export type TabBarProps = {
  id: string,
  children: React.Children,
  selectedIndex?: number
}

export default (connect(
  (state: Store, ownProps: TabBarProps) => ({
    activeIndex: selectors.getActiveIndexById(state, ownProps.id),
  }), {
    onMount: actions.init,
    onSelect: actions.select,
  },
)(ConnectedTabBar): TabBarProps)
