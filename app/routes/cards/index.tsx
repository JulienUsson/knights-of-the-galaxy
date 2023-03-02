import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

export const loader = async () => {
  return json({
    cardListItems: await db.card.findMany(),
  })
}

export default function CardsRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <Button component={Link} to="new">
        Create card
      </Button>
      <List>
        {data.cardListItems.map((card) => (
          <ListItem key={card.id}>
            <ListItemButton component={Link} to={card.id.toString()}>
              <ListItemText primary={card.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}
