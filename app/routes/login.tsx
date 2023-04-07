import { Container, Typography, Button, Stack, TextField } from '@mui/material'
import type { ActionArgs, MetaFunction } from '@remix-run/node'
import { useActionData, useNavigation } from '@remix-run/react'
import type { LoginFields } from '~/schemas/loginSchema'
import { loginSchema } from '~/schemas/loginSchema'
import { createUserSession, login } from '~/utils/session.server'

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  }
}

type ActionData = {
  formError?: string
  fields?: Partial<LoginFields>
}

export const action = async ({ request }: ActionArgs) => {
  let fields = Object.fromEntries(await request.formData())
  let results = loginSchema.safeParse(fields)

  if (!results.success) {
    return { formError: results.error.message, fields }
  }

  const user = await login(results.data)
  if (!user) {
    return { formError: 'Login et/ou mot de passe incorrecte', fields }
  }
  return createUserSession(user.id, '/')
}

export default function Login() {
  let actionData = useActionData<ActionData | undefined>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Container component="main" maxWidth="xs">
      <form method="post">
        <Stack sx={{ mt: 8 }} alignItems="center">
          <Typography component="h1" variant="h3">
            KOTG
          </Typography>
          <TextField
            label={'Username'}
            name="username"
            defaultValue={actionData?.fields?.username}
            margin="dense"
            fullWidth
            required
            autoFocus
          />
          <TextField
            label={'Password'}
            name="password"
            type="password"
            margin="dense"
            fullWidth
            required
          />
          {actionData?.formError && <Typography color="error">{actionData.formError}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 1 }}
          >
            Se connecter
          </Button>
        </Stack>
      </form>
    </Container>
  )
}
