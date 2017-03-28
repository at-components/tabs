// @flow
import React from 'react'

type TabBarProps = {
  name: string,
  children?: React.Children,
  selectedIndex: number,
  onSelect: () => { index: number, name: string }
}

const TabBar = ({ name, children, selectedIndex, onSelect }: TabBarProps) => {
  const handleSelect = (data) => () => onSelect(data)
  return (
    <div>
      { React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onSelectTab: handleSelect({ name, index }),
          selected: index === selectedIndex,
        })
      ) }
    </div>
  )
}

class ConnectedTabBar extends React.Component {
  props: TabBarProps & {
    onMount: () => number,
    selectIndex: number,
  }

  static defaultProps = {
    selectIndex: 0,
    onMount: () => {},
  }

  componentDidMount() {
    this.props.onMount(this.props.selectIndex)
  }

  render() {
    return (
      <TabBar
        name={ this.props.name }
        index={ 1 }
        onSelect={ this.props.onSelect }
        selectedIndex={ this.props.selectIndex }
      >
        { this.props.children }
      </TabBar>
    )
  }
}

export default ConnectedTabBar
