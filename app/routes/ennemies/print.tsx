import { Grid, styled } from '@mui/material'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Ennemy from '~/components/Ennemy'
import { db } from '~/utils/db.server'
import _ from 'lodash'
import { Fragment } from 'react'
import { requireUserId } from '~/utils/session.server'
import type { Ennemy as EnnemyEntity } from '@prisma/client'

type LoaderData = { ennemyListItems: EnnemyEntity[] }

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return json({
    ennemyListItems: await db.ennemy.findMany(),
  })
}

export default function EnnemiesRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <>
      {_.chunk(data.ennemyListItems, 9).map((ennemies, pageIndex) => (
        <Page key={pageIndex} container>
          {_.chunk(ennemies, 3).map((ennemies, lineIndex) => (
            <Grid container key={lineIndex}>
              <Grid item>
                <Ennemy
                  sx={{
                    borderTop: lineIndex === 0 ? '1px solid black' : undefined,
                    borderLeft: '1px solid black',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                  }}
                  {...ennemies[0]}
                />
              </Grid>
              {ennemies[1] && (
                <Grid item>
                  <Ennemy
                    sx={{
                      borderTop: lineIndex === 0 ? '1px solid black' : undefined,
                      borderBottom: '1px solid black',
                      borderRight: '1px solid black',
                    }}
                    {...ennemies[1]}
                  />
                </Grid>
              )}
              {ennemies[2] && (
                <Grid item>
                  <Ennemy
                    sx={{
                      borderTop: lineIndex === 0 ? '1px solid black' : undefined,
                      borderBottom: '1px solid black',
                      borderRight: '1px solid black',
                    }}
                    {...ennemies[2]}
                  />
                </Grid>
              )}
            </Grid>
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
