import { Grid, styled } from '@mui/material'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Ennemy from '~/components/Ennemy'
import { db } from '~/utils/db.server'
import _ from 'lodash'
import { Fragment } from 'react'

export const loader = async () => {
  return json({
    ennemyListItems: await db.ennemy.findMany(),
  })
}

export default function EnnemiesRoute() {
  const data = useLoaderData<typeof loader>()

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
                      borderLeft: '1px solid black',
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
