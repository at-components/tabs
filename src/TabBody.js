// @flow
import React from 'react'
import { connect } from 'react-redux'
import { selectors } from './reducer'
import type { Store } from './reducer'

export type ConnectedTabBodyProps = {
  activeIndex: number,
  children?: React.Children
}

export const ConnectedTabBody = ({ children, activeIndex }: ConnectedTabBodyProps) => {
  const tabs = []
  let activeBody = null
  React.Children.forEach(children, child => child && tabs.push(child))

  tabs.forEach((child, i) => {
    if (i === activeIndex) {
      activeBody = child
    }
  })
  return activeBody
}

export type TabBodyProps = {
  id: string,
  children: React.Children,
}

export default (connect(
  (state: Store, ownProps: TabBodyProps) => ({
    activeIndex: selectors.getActiveIndexById(state, ownProps.id),
  }),
)(ConnectedTabBody): TabBodyProps)
