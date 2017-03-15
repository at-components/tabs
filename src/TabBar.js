import React from 'react'
import reactCSS from 'reactcss'

export class TabBar extends React.Component {
  componentDidMount() {
    this.props.onMount(this.props.selectedIndex)
  }

  render() {
    const styles = reactCSS({
      default: {
        wrap: {

        },
      },
    })

    return (
      <div style={ styles.wrap }>
        TabBar
      </div>
    )
  }
}

TabBar.propTypes = {
  selectedIndex: React.PropTypes.number,
  onMount: React.PropTypes.func,
}

TabBar.defaultProps = {
  selectedIndex: 0,
  onMount: () => {},
}

export default TabBar
