import { json, redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction, MetaFunction } from '@remix-run/node'
import type { Equipment } from '@prisma/client'
import { db } from '~/utils/db.server'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { Button, Stack, Typography } from '@mui/material'
import EquipmentForm from '~/components/EquipmentForm'
import { equipmentSchema } from '~/schemas/equipmentSchema'

export let meta: MetaFunction = ({ data }: { data: LoaderData | undefined }) => {
  if (!data) {
    return {
      title: 'Not found',
    }
  }
  return {
    title: `Equipement/${data.equipment.title}`,
  }
}

type LoaderData = { equipment: Equipment }

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
  if (request.method === 'POST') {
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
    <>
      <Button component={Link} to="/equipments">
        Equipements
      </Button>
      <Form method="delete">
        <Button variant="contained" color="error" type="submit">
          Supprimer
        </Button>
      </Form>

      <Typography>{data.equipment.title}</Typography>
      <Form method="post">
        <Stack direction="column" spacing={1}>
          <EquipmentForm {...data.equipment} />
          {actionData?.formError && <Typography color="error">{actionData.formError}</Typography>}
          <Button variant="contained" type="submit">
            Editer
          </Button>
        </Stack>
      </Form>
    </>
  )
}
