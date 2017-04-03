// @flow
import React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from './reducer'
import type { Store } from './reducer'

type TabBarProps = {
  id: string,
  children?: React.Children,
  activeIndex: number,
  onSelect: ({ index: number, id: string }) => void
}

const TabBar = ({ id, children, activeIndex, onSelect }: TabBarProps) => {
  const handleSelect = data => () => onSelect(data)
  return (
    <div>
      { React.Children.map(children, (child, index: number) =>
        React.cloneElement(child, {
          onSelect: handleSelect({ id, index }),
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
        id={ this.props.id }
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
    activeIndex: selectors.getActiveIndexById(state, ownProps.id),
  }), {
    onMount: actions.init,
    onSelect: actions.select,
  },
)(ConnectedTabBar)
