import { NextComponentType } from 'next'
import { Component } from 'react'

type LayoutingComponent = NextComponentType & {
  Layout?: any
}

const getDisplayName = (Components: NextComponentType) => Components.displayName || Components.name || 'Component'

export const withAuthSync = (WrappedComponent: LayoutingComponent) => class extends Component {
  static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`
  static Layout = WrappedComponent?.Layout || null

  constructor (props: any) {
    super(props)
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}

