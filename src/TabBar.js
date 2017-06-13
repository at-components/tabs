// @flow
import React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from './reducer'
import type { Store, SelectParams } from './reducer'
import { recursiveCloneChildren } from './helpers'

type TabBarProps = {
  kind: string,
  children?: React.Children,
  selectedTab?: string,
  initialTab?: string,
  onSelect: (SelectParams) => void
}

export const TabBar = ({ selectedTab, initialTab, kind, children, onSelect }: TabBarProps) => {
  let initialized = selectedTab !== undefined
  if (!initialized && initialTab) {
    onSelect({ kind, name: initialTab })
    initialized = true
  }

  return (
    <div>
      { recursiveCloneChildren(children, (tab) => {
        const { name } = tab.props
        if (!initialized && tab) {
          onSelect({ kind, name })
        }
        return {
          onSelect: () => onSelect({ kind, name }),
          active: selectedTab === name,
        }
      }) }
    </div>
  )
}

export default connect(
  (state: Store, ownProps: TabBarProps) => ({
    selectedTab: selectors.getSelectedTabByKind(state, ownProps.kind),
  }), {
    onSelect: actions.select,
  },
)(TabBar)
