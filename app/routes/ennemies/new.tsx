import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData, Form } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { Button, Container, Stack, Typography } from '@mui/material'
import EnnemyForm from '~/components/EnnemyForm'
import type { EnnemyFields } from '~/schemas/ennemySchema'
import { ennemySchema } from '~/schemas/ennemySchema'
import { requireUserId } from '~/utils/session.server'

type ActionData = {
  formError?: string
  fields?: Partial<EnnemyFields>
}

export let action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  await requireUserId(request)
  let fields = Object.fromEntries(await request.formData())
  let results = ennemySchema.safeParse(fields)

  if (!results.success) {
    return { formError: results.error.message, fields }
  }

  let ennemy = await db.ennemy.create({ data: results.data })
  return redirect(`/ennemies/${ennemy.id}`)
}

export default function NewEnnemyRoute() {
  let actionData = useActionData<ActionData | undefined>()

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Créer un ennemie
      </Typography>
      <Form method="post">
        <Stack direction="column" spacing={2}>
          <EnnemyForm {...actionData?.fields} />
          {actionData?.formError && <Typography color="error">{actionData.formError}</Typography>}
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </Form>
    </Container>
  )
}
