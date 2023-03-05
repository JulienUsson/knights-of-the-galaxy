import { Grid, styled } from '@mui/material'
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
