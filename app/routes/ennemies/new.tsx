import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData, Form } from '@remix-run/react'
import { Ennemy as EnnemyEntity } from '~/entities/ennemy.entity'
import { Button, Stack, Typography } from '@mui/material'
import EnnemyForm from '~/components/EnnemyForm'
import type { EnnemyFields } from '~/schemas/ennemySchema'
import { ennemySchema } from '~/schemas/ennemySchema'
import { requireUserId } from '~/utils/session.server'
import { getEnnemyRepository } from '~/utils/db.server'
import { Layout } from '~/components/Layout'

type ActionData = {
  formError?: string
  fields?: Partial<EnnemyFields>
}

export let action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  await requireUserId(request)

  const ennemyRepository = await getEnnemyRepository()
  let fields = Object.fromEntries(await request.formData())
  let results = ennemySchema.safeParse(fields)

  if (!results.success) {
    return { formError: results.error.message, fields }
  }

  let ennemy = EnnemyEntity.fromFields(results.data)
  await ennemyRepository.save(ennemy)
  return redirect(`/ennemies/${ennemy.id}`)
}

export default function NewEnnemyRoute() {
  let actionData = useActionData<ActionData | undefined>()

  return (
    <Layout title="Créer un ennemie">
      <Form method="post">
        <Stack direction="column" spacing={2}>
          <EnnemyForm {...actionData?.fields} />
          {actionData?.formError && <Typography color="error">{actionData.formError}</Typography>}
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </Form>
    </Layout>
  )
}
