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
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { requireUserId } from '~/utils/session.server'
import { db } from '~/utils/db.server'
import type { Equipment as EquipmentEntity } from '@prisma/client'

type LoaderData = { equipmentListItems: EquipmentEntity[] }

export let loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return json({
    equipmentListItems: await db.equipment.findMany(),
  })
}

export default function EquipmentsRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <Container maxWidth="lg">
      <Button component={Link} to="/">
        &lt;- Accueil
      </Button>
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
              <ListItemText primary={equipment.name} sx={{ color: equipment.type }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
