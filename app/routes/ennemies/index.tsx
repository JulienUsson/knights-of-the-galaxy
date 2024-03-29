import { Button, List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import _ from 'lodash'
import { requireUserId } from '~/utils/session.server'
import type { Ennemy as EnnemyEntity } from '~/entities/ennemy.entity'
import { getEnnemyRepository } from '~/utils/db.server'
import { Layout } from '~/components/Layout'

type LoaderData = { ennemyListItems: EnnemyEntity[] }

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)

  const ennemyRepository = await getEnnemyRepository()
  return json({
    ennemyListItems: await ennemyRepository.find(),
  })
}

export default function EnnemiesRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <Layout title="Liste des ennemies">
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
        {_.sortBy(data.ennemyListItems, ['phase', 'type']).map((ennemy) => (
          <ListItem key={ennemy.id}>
            <ListItemButton component={Link} to={ennemy.id.toString()}>
              <ListItemText
                primary={`[${ennemy.type.toUpperCase()}] ${ennemy.name}`}
                secondary={`Phase ${ennemy.phase}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}
