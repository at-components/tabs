// @flow
import React from 'react'

type TabBarProps = {
  index: number
}

export const TabBar = ({ index }: TabBarProps) => {
  return (
    <div>
      TabBar { index }
    </div>
  )
}

class ConnectedTabBar extends React.Component {
  props: {
    onMount: () => number,
    selectIndex: number
  }

  static defaultProps = {
    selectIndex: 0,
  }

  componentDidMount() {
    this.props.onMount(this.props.selectIndex)
  }

  render() {
    return <TabBar index={ 1 } />
  }
}

export default ConnectedTabBar
