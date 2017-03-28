// @flow
import React from 'react'
import { connect } from 'react-redux'
import { selectors } from './reducer'
import type { Store, Init, Select } from './reducer'

type TabBarProps = {
  name: string,
  children?: React.Children,
  activeIndex: number,
  onSelect: ({ index: number, name: string }) => void
}

const TabBar = ({ name, children, activeIndex, onSelect }: TabBarProps) => {
  const handleSelect = data => () => onSelect(data)
  return (
    <div>
      { React.Children.map(children, (child, index: number) =>
        React.cloneElement(child, {
          onSelectTab: handleSelect({ name, index }),
          active: index === activeIndex,
        }),
      ) }
    </div>
  )
}

type ConnectedTabBarProps = TabBarProps & {
  onMount: (index: number) => void,
  selectedIndex: number,
}

export class ConnectedTabBar extends React.Component {
  props: ConnectedTabBarProps

  static defaultProps = {
    selectedIndex: 0,
    onMount: () => {},
  }

  componentDidMount() {
    this.props.onMount(this.props.selectedIndex)
  }

  render() {
    return (
      <TabBar
        name={ this.props.name }
        index={ 1 }
        onSelect={ this.props.onSelect }
        activeIndex={ this.props.activeIndex }
      >
        { this.props.children }
      </TabBar>
    )
  }
}

export default connect(
  (state: Store, ownProps: ConnectedTabBarProps) => ({
    activeIndex: selectors.getActiveIndexByName(state, ownProps.name),
  }), {
    onMount: ({ name, index }) => ({ type: 'TABS/INIT', name, index }: Init),
    onSelect: ({ name, index }) => ({ type: 'TABS/SELECT', name, index }: Select),
  },
)(ConnectedTabBar)
