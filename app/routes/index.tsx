import type { MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return {
    title: 'Cards Generator',
  }
}

export const loader = async () => {
  return redirect('/equipments')
}
