// @flow
import React from 'react'

type SelectTabData = { index: number, name: string }
type TabBarProps = {
  name: string,
  children?: React.Children,
  selectedIndex: number,
  onSelect: () => SelectTabData
}

const TabBar = ({ name, children, selectedIndex, onSelect }: TabBarProps) => {
  const handleSelect = (data: SelectTabData) => () => onSelect(data)
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
  props: {
    name: string,
    onMount: () => number,
    selectIndex: number,
    children: React.Children,
    onSelect: () => SelectTabData
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
