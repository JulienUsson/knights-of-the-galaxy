import { json, redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction, MetaFunction } from '@remix-run/node'
import { Equipment as EquipmentEntity } from '~/entities/equipment.entity'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import EquipmentForm from '~/components/EquipmentForm'
import { equipmentSchema } from '~/schemas/equipmentSchema'
import Equipment from '~/components/Equipment'
import { requireUserId } from '~/utils/session.server'
import { getEquipmentRepository } from '~/utils/db.server'

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
  await requireUserId(request)

  const equipmentRepository = await getEquipmentRepository()
  let equipment = await equipmentRepository.findOne({
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
  await requireUserId(request)

  const equipmentRepository = await getEquipmentRepository()
  let id = Number.parseInt(params.equipmentId!)
  if (request.method === 'PUT') {
    let fields = Object.fromEntries(await request.formData())
    let results = equipmentSchema.safeParse(fields)

    if (!results.success) {
      return { fieldErrors: results.error.message, fields }
    }

    let equipment = EquipmentEntity.fromFields(results.data, id)
    await equipmentRepository.save(equipment)
    return null
  } else if (request.method === 'POST') {
    let equipment = await equipmentRepository.findOne({
      where: { id },
    })
    if (!equipment) {
      throw new Response('Not found', { status: 404 })
    }
    let newEquipment = equipment.duplicate()
    await equipmentRepository.save(newEquipment)
    return redirect(`/equipments/${newEquipment.id}`)
  } else if (request.method === 'DELETE') {
    let equipment = await equipmentRepository.findOne({
      where: { id: id },
    })
    if (!equipment) {
      throw new Response('Not found', { status: 404 })
    }
    await equipmentRepository.remove(equipment)
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
        <Button component={Link} to="print" variant="contained">
          Imprimer
        </Button>
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
