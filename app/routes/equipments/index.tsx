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

export const loader = async () => {
  return json({
    equipmentListItems: await db.equipment.findMany(),
  })
}

export default function EquipmentsRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">Liste des équipements</Typography>
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
        {data.equipmentListItems.map((equipment) => (
          <ListItem key={equipment.id}>
            <ListItemButton component={Link} to={equipment.id.toString()}>
              <ListItemText primary={equipment.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
