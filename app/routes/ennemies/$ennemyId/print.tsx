import { Grid, styled } from '@mui/material'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Ennemy from '~/components/Ennemy'
import { db } from '~/utils/db.server'
import type { Ennemy as EnnemyEntity } from '@prisma/client'

type LoaderData = { ennemy: EnnemyEntity }

export let loader: LoaderFunction = async ({ request, params }) => {
  let ennemy = await db.ennemy.findFirst({
    where: { id: Number.parseInt(params.ennemyId!) },
  })

  if (!ennemy) {
    throw new Response('Not found.', { status: 404 })
  }
  let data: LoaderData = { ennemy }
  return json(data)
}

export default function EnnemyPrintRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <Page container>
      <Grid item>
        <Ennemy sx={{ border: '1px solid black' }} {...data.ennemy} />
      </Grid>
    </Page>
  )
}

const Page = styled(Grid)({
  margin: '1cm',
  pageBreakAfter: 'always',
})
