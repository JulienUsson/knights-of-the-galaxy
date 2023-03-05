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
      {_.chunk(data.ennemyListItems, 8).map((ennemies, pageIndex) => (
        <Page key={pageIndex} container>
          {_.chunk(ennemies, 2).map((ennemies, lineIndex) => (
            <Fragment key={lineIndex}>
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
