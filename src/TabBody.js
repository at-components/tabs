// @flow
import React from 'react'
import { connect } from 'react-redux'
import { selectors } from './reducer'
import type { Store } from './reducer'

export type TabBodyProps = {
  selectedTab?: string,
  children?: React.Children
}

export const TabBody = ({ children, selectedTab }: TabBodyProps) => {
  let body = null
  React.Children.forEach(children, (tabBody) => {
    if (tabBody && tabBody.props.name === selectedTab) {
      body = tabBody
    }
  })

  return body
}

export default connect(
  (state: Store, ownProps: TabBodyProps & { kind: string }) => ({
    selectedTab: selectors.getSelectedTabByKind(state, ownProps.kind),
  }),
)(TabBody)
