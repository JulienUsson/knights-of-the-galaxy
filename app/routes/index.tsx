import { Button, Container, Stack } from '@mui/material'
import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return {
    title: 'Cards Generator',
  }
}

export default function IndexRoute() {
  return (
    <Container maxWidth="lg">
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
