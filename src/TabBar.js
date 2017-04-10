// @flow
import React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from './reducer'
import type { Store, SelectParams, InitParams } from './reducer'

type PresentationalTabBarProps = {
  kind: string,
  children?: React.Children,
  activeIndex: number,
  onSelect: (SelectParams) => void
}

const PresentationalTabBar = ({ kind, children, activeIndex, onSelect }:
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
          onSelect: handleSelect({ kind, name: child.props.name, index }),
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
      kind: this.props.kind,
      index: this.props.selectedIndex,
    })
  }

  render() {
    return (
      <PresentationalTabBar
        kind={ this.props.kind }
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
    activeIndex: selectors.getActiveIndexByKind(state, ownProps.id),
  }), {
    onMount: actions.init,
    onSelect: actions.select,
  },
)(ConnectedTabBar): TabBarProps)
