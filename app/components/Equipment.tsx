import { Divider, Grid, Stack, styled, Typography } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'
import _ from 'lodash'

export default function Equipment(props: Partial<EquipmentEntity>) {
  const actionCosts = props.actionCost?.split(';') ?? []
  const marketCosts = props.marketCost?.split(';') ?? []

  return (
    <Stack alignItems="center" justifyContent="center" height="100%">
      <Card container>
        <Grid item xs={4} padding={1}>
          <Grid container spacing={2}>
            {_.range(4).map((i) => (
              <Dice key={i} actionCost={actionCosts[i]} marketCost={marketCosts[i]} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Typography align="center" variant="h6">
            {props.name}
          </Typography>
          <Typography align="center">{props.action}</Typography>
        </Grid>
      </Card>
    </Stack>
  )
}

interface DiceProps {
  actionCost: string
  marketCost: string
}

function Dice({ actionCost, marketCost }: DiceProps) {
  return (
    <Grid item xs={6}>
      <Stack
        alignItems="center"
        justifyContent="center"
        width="72px"
        height="72px"
        border="1px solid grey"
        bgcolor={colorTranslator(marketCost)}
      >
        <Typography variant="button" fontSize="1.4rem">
          {actionCost}
        </Typography>
      </Stack>
    </Grid>
  )
}

const Card = styled(Grid)({
  width: 498,
  height: 358,
  backgroundColor: '#ccc',

  '@media print': {
    width: '88mm',
    height: '63mm',
  },
})

function colorTranslator(color: string) {
  switch (color) {
    case 'rouge':
      return 'red'
    case 'vert':
      return 'green'
    case 'bleu':
      return 'blue'
    case 'noir':
      return 'black'
  }
}
