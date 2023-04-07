import { Grid, styled } from '@mui/material'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Equipment from '~/components/Equipment'
import { db } from '~/utils/db.server'
import type { Equipment as EquipmentEntity } from '@prisma/client'
import { requireUserId } from '~/utils/session.server'

type LoaderData = { equipment: EquipmentEntity }

export let loader: LoaderFunction = async ({ request, params }) => {
  await requireUserId(request)
  let equipment = await db.equipment.findFirst({
    where: { id: Number.parseInt(params.equipmentId!) },
  })

  if (!equipment) {
    throw new Response('Not found.', { status: 404 })
  }
  let data: LoaderData = { equipment }
  return json(data)
}

export default function EquipmentPrintRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <Page container>
      <Grid item>
        <Equipment sx={{ border: '1px solid black' }} {...data.equipment} />
      </Grid>
    </Page>
  )
}

const Page = styled(Grid)({
  margin: '1cm',
  pageBreakAfter: 'always',
})
