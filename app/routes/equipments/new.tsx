import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData, Form } from '@remix-run/react'
import { Equipment as EquipmentEntity } from '~/entities/equipment.entity'
import { Button, Container, Stack, Typography } from '@mui/material'
import EquipmentForm from '~/components/EquipmentForm'
import type { EquipmentFields } from '~/schemas/equipmentSchema'
import { equipmentSchema } from '~/schemas/equipmentSchema'
import { requireUserId } from '~/utils/session.server'
import { getEquipmentRepository } from '~/utils/db.server'

export let loader: LoaderFunction = async ({ request }) => {
  return await requireUserId(request)
}

type ActionData = {
  formError?: string
  fields?: Partial<EquipmentFields>
}

export let action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  await requireUserId(request)

  const equipmentRepository = await getEquipmentRepository()
  let fields = Object.fromEntries(await request.formData())
  let results = equipmentSchema.safeParse(fields)

  if (!results.success) {
    return { formError: results.error.message, fields }
  }

  let equipment = EquipmentEntity.fromFields(results.data)
  await equipmentRepository.save(equipment)
  return redirect(`/equipments/${equipment.id}`)
}

export default function NewEquipmentRoute() {
  let actionData = useActionData<ActionData | undefined>()

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Créer un équipement
      </Typography>
      <Form method="post">
        <Stack direction="column" spacing={2}>
          <EquipmentForm {...actionData?.fields} />
          {actionData?.formError && <Typography color="error">{actionData.formError}</Typography>}
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </Form>
    </Container>
  )
}
