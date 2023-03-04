import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
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
    <>
      <Button component={Link} to="new">
        Créer
      </Button>
      <List>
        {data.equipmentListItems.map((equipment) => (
          <ListItem key={equipment.id}>
            <ListItemButton component={Link} to={equipment.id.toString()}>
              <ListItemText primary={equipment.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}
