import { Grid, styled } from '@mui/material'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Equipment from '~/components/Equipment'
import _ from 'lodash'
import { Fragment } from 'react'
import { requireUserId } from '~/utils/session.server'
import type { Equipment as EquipmentEntity } from '~/entities/equipment.entity'
import { getEquipmentRepository } from '~/utils/db.server'

type LoaderData = { equipmentListItems: EquipmentEntity[] }

export let loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)

  const equipmentRepository = await getEquipmentRepository()
  return json({
    equipmentListItems: await equipmentRepository.find(),
  })
}

export default function EquipmentsRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <>
      {_.chunk(data.equipmentListItems, 8).map((equipments, pageIndex) => (
        <Page key={pageIndex} container>
          {_.chunk(equipments, 2).map((equipments, lineIndex) => (
            <Fragment key={lineIndex}>
              <Grid item>
                <Equipment
                  sx={{
                    borderTop: lineIndex === 0 ? '1px solid black' : undefined,
                    borderLeft: '1px solid black',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                  }}
                  {...equipments[0]}
                />
              </Grid>
              {equipments[1] && (
                <Grid item>
                  <Equipment
                    sx={{
                      borderTop: lineIndex === 0 ? '1px solid black' : undefined,
                      borderBottom: '1px solid black',
                      borderRight: '1px solid black',
                    }}
                    {...equipments[1]}
                  />
                </Grid>
              )}
            </Fragment>
          ))}
        </Page>
      ))}
    </>
  )
}

const Page = styled(Grid)({
  margin: '1cm',
  pageBreakAfter: 'always',
})
