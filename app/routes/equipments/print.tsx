import { Stack, styled } from '@mui/material'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Equipment from '~/components/Equipment'
import { db } from '~/utils/db.server'
import _ from 'lodash'
import { Fragment } from 'react'

export const loader = async () => {
  return json({
    equipmentListItems: await db.equipment.findMany(),
  })
}

export default function EquipmentsRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      {_.chunk(data.equipmentListItems, 8).map((equipments, index) => (
        <Page key={index}>
          {_.chunk(equipments, 2).map((equipments, index) => (
            <Stack key={index} direction="row">
              <Equipment {...equipments[0]} />
              <Equipment {...equipments[1]} />
            </Stack>
          ))}
        </Page>
      ))}
    </>
  )
}

const Page = styled('div')({
  pageBreakAfter: 'always',
})
