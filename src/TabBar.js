// @flow
import React from 'react'

type TabSelectMethod = () => { index: number, name: string }
type TabBarProps = {
  name: string,
  children?: React.Children,
  onSelect: TabSelectMethod
}

const TabBar = ({ name, children, onSelect }: TabBarProps) => {
  const handleSelect = nameAndIndex => () => onSelect(nameAndIndex)
  return (
    <div>
      { React.Children.map(children, (child, index) => (
        React.cloneElement(child, {
          onSelectTab: handleSelect({ name, index }),
        })
      )) }
    </div>
  )
}

class ConnectedTabBar extends React.Component {
  props: {
    name: string,
    onMount: () => number,
    selectIndex: number,
    children: React.Children,
    onSelect: TabSelectMethod
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
      >
        { this.props.children }
      </TabBar>
    )
  }
}

export default ConnectedTabBar
