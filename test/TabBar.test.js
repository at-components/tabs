/* eslint-disable no-unused-vars */
import React from 'react'
import { TabBar } from '../src/TabBar'

describe('TabBar', () => {
  describe('onMount', () => {
    test('calls 0 as default', () => {
      const handleMount = index => expect(index).toEqual(0)
      const rendered = <TabBar onMount={ handleMount } />
    })
    test('calls 1 when selectedIndex = 1', () => {
      const handleMount = index => expect(index).toEqual(1)
      const rendered = <TabBar selectedIndex={ 1 } onMount={ handleMount } />
    })
  })
})
