// @flow
import React from 'react'

type TabBarProps = {
  index: number,
  children?: React.Children
}

const TabBar = ({ index, children }: TabBarProps) => {
  return (
    <div>
      { React.Children.map(children, child => (
        React.cloneElement(child, { onSelectTab: () => {} })
      )) }
    </div>
  )
}

class ConnectedTabBar extends React.Component {
  props: {
    onMount: () => number,
    selectIndex: number,
    children: React.Children
  }

  static defaultProps = {
    selectIndex: 0,
  }

  componentDidMount() {
    this.props.onMount(this.props.selectIndex)
  }

  render() {
    return <TabBar index={ 1 }>{ this.props.children }</TabBar>
  }
}

export default ConnectedTabBar
