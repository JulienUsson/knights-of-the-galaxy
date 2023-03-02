import * as React from 'react'
import type { MetaFunction } from '@remix-run/node'

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'Cards Generator',
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return <React.Fragment></React.Fragment>
}
