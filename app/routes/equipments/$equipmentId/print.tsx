import { Grid, styled } from '@mui/material'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Equipment from '~/components/Equipment'
import type { Equipment as EquipmentEntity } from '~/entities/equipment.entity'
import { getEquipmentRepository } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'

type LoaderData = { equipment: EquipmentEntity }

export let loader: LoaderFunction = async ({ request, params }) => {
  await requireUserId(request)

  const equipmentRepository = await getEquipmentRepository()
  let equipment = await equipmentRepository.findOne({
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
