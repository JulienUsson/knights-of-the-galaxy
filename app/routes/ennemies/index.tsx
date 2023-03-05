import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import _ from 'lodash'

export const loader = async () => {
  return json({
    ennemyListItems: await db.ennemy.findMany(),
  })
}

export default function EnnemiesRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <Container maxWidth="lg">
      <Button component={Link} to="/">
        &lt;- Accueil
      </Button>
      <Typography variant="h2">Liste des ennemies</Typography>
      <Stack direction="row" spacing={2} mb={4}>
        <Button variant="contained" component={Link} to="new">
          Créer
        </Button>
        <Button variant="contained" component={Link} to="print">
          Imprimer
        </Button>
        <Button variant="contained" component={Link} to="print-back">
          Imprimer dos
        </Button>
      </Stack>
      <List>
        {_.sortBy(data.ennemyListItems, ['type']).map((ennemy) => (
          <ListItem key={ennemy.id}>
            <ListItemButton component={Link} to={ennemy.id.toString()}>
              <ListItemText primary={ennemy.name} secondary={ennemy.type} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
