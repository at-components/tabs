// @flow
import React from 'react'

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

class ConnectedTabBar extends React.Component {
  props: TabBarProps & {
    onMount: (index: number) => void,
    selectedIndex: number,
  }

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
        activeIndex={ this.props.selectedIndex }
      >
        { this.props.children }
      </TabBar>
    )
  }
}

export default ConnectedTabBar
