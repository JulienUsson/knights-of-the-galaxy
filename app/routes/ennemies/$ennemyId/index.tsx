import { json, redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction, MetaFunction } from '@remix-run/node'
import type { Ennemy as EnnemyEntity } from '@prisma/client'
import { db } from '~/utils/db.server'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import EnnemyForm from '~/components/EnnemyForm'
import Ennemy from '~/components/Ennemy'
import _ from 'lodash'
import { ennemySchema } from '~/schemas/ennemySchema'
import { requireUserId } from '~/utils/session.server'

export let meta: MetaFunction = ({ data }: { data: LoaderData | undefined }) => {
  if (!data) {
    return {
      title: 'Not found',
    }
  }
  return {
    title: `Ennemie/${data.ennemy.name}`,
  }
}

type LoaderData = { ennemy: EnnemyEntity }

export let loader: LoaderFunction = async ({ request, params }) => {
  await requireUserId(request)
  let ennemy = await db.ennemy.findFirst({
    where: { id: Number.parseInt(params.ennemyId!) },
  })

  if (!ennemy) {
    throw new Response('Not found.', { status: 404 })
  }
  let data: LoaderData = { ennemy }
  return json(data)
}

type ActionData = {
  formError?: string
  fieldErrors?: string
}

export let action: ActionFunction = async ({ request, params }) => {
  await requireUserId(request)
  let id = Number.parseInt(params.ennemyId!)
  if (request.method === 'PUT') {
    let fields = Object.fromEntries(await request.formData())
    let results = ennemySchema.safeParse(fields)

    if (!results.success) {
      return { fieldErrors: results.error.message, fields }
    }

    await db.ennemy.update({
      where: { id },
      data: results.data,
    })
    return null
  } else if (request.method === 'POST') {
    let ennemy = await db.ennemy.findFirst({
      where: { id },
    })
    if (!ennemy) {
      throw new Response('Not found', { status: 404 })
    }
    let newEnnemy = await db.ennemy.create({ data: _.omit(ennemy, ['id']) })
    return redirect(`/ennemies/${newEnnemy.id}`)
  } else if (request.method === 'DELETE') {
    let ennemy = await db.ennemy.findFirst({
      where: { id: id },
    })
    if (!ennemy) {
      throw new Response('Not found', { status: 404 })
    }
    await db.ennemy.delete({ where: { id: id } })
    return redirect('/ennemies')
  }
}

export default function EnnemyRoute() {
  let data = useLoaderData<LoaderData>()
  let actionData = useActionData<ActionData | undefined>()

  return (
    <Container maxWidth="lg">
      <Button component={Link} to="/ennemies">
        &lt;- Ennemies
      </Button>
      <Typography variant="h2">Editer un ennemie</Typography>
      <Stack direction="row" spacing={1} mb={4}>
        <Form method="post">
          <Button variant="contained" type="submit">
            Cloner
          </Button>
        </Form>
        <Form method="delete">
          <Button variant="contained" color="error" type="submit">
            Supprimer
          </Button>
        </Form>
        <Button component={Link} to="print" variant="contained">
          Imprimer
        </Button>
      </Stack>

      <Grid container spacing={1} direction={{ xs: 'column-reverse', sm: 'row' }}>
        <Grid item xs={12} sm={6}>
          <Form method="put">
            <Stack direction="column" spacing={2}>
              <EnnemyForm {...data.ennemy} />
              {actionData?.formError && (
                <Typography color="error">{actionData.formError}</Typography>
              )}
              <Button variant="contained" type="submit">
                Editer
              </Button>
            </Stack>
          </Form>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Ennemy {...data.ennemy} />
        </Grid>
      </Grid>
    </Container>
  )
}
