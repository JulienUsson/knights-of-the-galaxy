import { Grid, styled } from '@mui/material'
import Phase from '~/components/Phase'

export default function PhasesRoute() {
  return (
    <Page container>
      <Grid container>
        <Grid item xs={6}>
          <Phase
            value={1}
            sx={{
              borderTop: '1px solid black',
              borderLeft: '1px solid black',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Phase
            value={2}
            sx={{
              borderTop: '1px solid black',
              borderBottom: '1px solid black',
              borderLeft: '1px solid black',
              borderRight: '1px solid black',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Phase
            value={3}
            sx={{
              borderTop: '1px solid black',
              borderBottom: '1px solid black',
              borderLeft: '1px solid black',
              borderRight: '1px solid black',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Phase
            value={4}
            sx={{
              borderBottom: '1px solid black',
              borderRight: '1px solid black',
            }}
          />
        </Grid>
      </Grid>
    </Page>
  )
}

const Page = styled(Grid)({
  margin: '1cm',
  pageBreakAfter: 'always',
})
