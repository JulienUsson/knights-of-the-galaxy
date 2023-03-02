import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData, Form } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { z } from 'zod'
import { Button, TextField } from '@mui/material'

const schema = z.object({
  title: z.string(),
})

type Fields = z.infer<typeof schema>

type ActionData = {
  formError?: string
  fieldErrors?: z.inferFormattedError<typeof schema>
  fields?: Partial<Fields>
}

export let action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  let fields = Object.fromEntries(await request.formData())
  let results = schema.safeParse(fields)

  if (!results.success) {
    return { fieldErrors: results.error.format(), fields }
  }

  let card = await db.card.create({ data: results.data })
  return redirect(`/cards/${card.id}`)
}

export default function NewCardRoute() {
  let actionData = useActionData<ActionData | undefined>()

  return (
    <Form method="post">
      <TextField
        name="title"
        defaultValue={actionData?.fields?.title}
        label="Title"
        variant="outlined"
        required
      />
      <Button type="submit">Create</Button>
    </Form>
  )
}
