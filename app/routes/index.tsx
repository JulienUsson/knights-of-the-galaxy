import { Button, Container, Stack, Typography } from '@mui/material'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { requireUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => {
  return {
    title: 'Knights of the Galaxy',
  }
}

export let loader: LoaderFunction = async ({ request }) => {
  return await requireUserId(request)
}

export default function IndexRoute() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Knights of the galaxy
      </Typography>
      <Stack direction="row" spacing={2} mb={4}>
        <Button variant="contained" component={Link} to="/equipments">
          Equipements
        </Button>
        <Button variant="contained" component={Link} to="/ennemies">
          Ennemies
        </Button>
      </Stack>
    </Container>
  )
}
