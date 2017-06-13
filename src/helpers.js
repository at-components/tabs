import React from 'react'

const isComponent = (element = {}): boolean =>
  React.isValidElement(element) && typeof element.type !== 'string'

export const recursiveCloneChildren = (children?: React.Children,
  calculateProps: (React.Children) => {}) => {
  return React.Children.map(children, (child) => {
    return child ? React.cloneElement(
      child,
      isComponent(child)
        ? calculateProps(child)
        : {
          children: child.props
            ? recursiveCloneChildren(child.props.children, calculateProps)
            : null,
        },
    ) : null
  })
}
