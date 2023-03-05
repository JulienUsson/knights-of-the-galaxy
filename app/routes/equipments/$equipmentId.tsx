import { json, redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction, MetaFunction } from '@remix-run/node'
import type { Equipment as EquipmentEntity } from '@prisma/client'
import { db } from '~/utils/db.server'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import EquipmentForm from '~/components/EquipmentForm'
import { equipmentSchema } from '~/schemas/equipmentSchema'
import Equipment from '~/components/Equipment'
import _ from 'lodash'

export let meta: MetaFunction = ({ data }: { data: LoaderData | undefined }) => {
  if (!data) {
    return {
      title: 'Not found',
    }
  }
  return {
    title: `Equipement/${data.equipment.name}`,
  }
}

type LoaderData = { equipment: EquipmentEntity }

export let loader: LoaderFunction = async ({ request, params }) => {
  let equipment = await db.equipment.findFirst({
    where: { id: Number.parseInt(params.equipmentId!) },
  })

  if (!equipment) {
    throw new Response('Not found.', { status: 404 })
  }
  let data: LoaderData = { equipment }
  return json(data)
}

type ActionData = {
  formError?: string
  fieldErrors?: string
}

export let action: ActionFunction = async ({ request, params }) => {
  let id = Number.parseInt(params.equipmentId!)
  if (request.method === 'PUT') {
    let fields = Object.fromEntries(await request.formData())
    let results = equipmentSchema.safeParse(fields)

    if (!results.success) {
      return { fieldErrors: results.error.message, fields }
    }

    await db.equipment.update({
      where: { id },
      data: results.data,
    })
    return null
  } else if (request.method === 'POST') {
    let equipment = await db.equipment.findFirst({
      where: { id },
    })
    if (!equipment) {
      throw new Response('Not found', { status: 404 })
    }
    let newEquipment = await db.equipment.create({ data: _.omit(equipment, ['id']) })
    return redirect(`/equipments/${newEquipment.id}`)
  } else if (request.method === 'DELETE') {
    let equipment = await db.equipment.findFirst({
      where: { id: id },
    })
    if (!equipment) {
      throw new Response('Not found', { status: 404 })
    }
    await db.equipment.delete({ where: { id: id } })
    return redirect('/equipments')
  }
}

export default function EquipmentRoute() {
  let data = useLoaderData<LoaderData>()
  let actionData = useActionData<ActionData | undefined>()

  return (
    <Container maxWidth="lg">
      <Button component={Link} to="/equipments">
        &lt;- Equipements
      </Button>
      <Typography variant="h2">Editer un équipement</Typography>
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
      </Stack>

      <Grid container spacing={1} direction={{ xs: 'column-reverse', sm: 'row' }}>
        <Grid item xs={12} sm={6}>
          <Form method="put">
            <Stack direction="column" spacing={2}>
              <EquipmentForm {...data.equipment} />
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
          <Equipment {...data.equipment} />
        </Grid>
      </Grid>
    </Container>
  )
}
