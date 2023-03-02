import { json, redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction, MetaFunction } from '@remix-run/node'
import type { Card } from '@prisma/client'
import { db } from '~/utils/db.server'
import { Form, useLoaderData } from '@remix-run/react'
import { Button, Typography } from '@mui/material'

export let meta: MetaFunction = ({ data }: { data: LoaderData | undefined }) => {
  if (!data) {
    return {
      title: 'Not found',
    }
  }
  return {
    title: `"${data.card.title}" card`,
  }
}

type LoaderData = { card: Card }

export let loader: LoaderFunction = async ({ request, params }) => {
  let card = await db.card.findFirst({
    where: { id: Number.parseInt(params.cardId!) },
  })

  if (!card) {
    throw new Response('Not found.', { status: 404 })
  }
  let data: LoaderData = { card }
  return json(data)
}

export let action: ActionFunction = async ({ request, params }) => {
  let cardId = Number.parseInt(params.cardId!)
  if (request.method === 'DELETE') {
    let joke = await db.card.findFirst({
      where: { id: cardId },
    })
    if (!joke) {
      throw new Response('Not found', { status: 404 })
    }
    await db.card.delete({ where: { id: cardId } })
    return redirect('/cards')
  }
}

export default function JokeRoute() {
  let data = useLoaderData<LoaderData>()

  return (
    <>
      <Form method="delete">
        <Button type="submit">Delete</Button>
      </Form>

      <Typography>{data.card.title}</Typography>
    </>
  )
}
