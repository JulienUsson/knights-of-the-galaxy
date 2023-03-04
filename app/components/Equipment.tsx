import type { SxProps, Theme } from '@mui/material'
import { Grid, Stack, styled, Typography } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'
import _ from 'lodash'

interface Props extends Partial<EquipmentEntity> {
  sx?: SxProps<Theme>
}

export default function Equipment({ sx, ...equipment }: Props) {
  const actionCosts = equipment.actionCost?.split(';') ?? []
  const marketCosts = equipment.marketCost?.split(';') ?? []

  return (
    <Stack alignItems="center" justifyContent="center" height="100%" sx={sx}>
      <Card>
        <CardContent direction="row">
          <Stack direction="column" width="50mm">
            <Grid container>
              {_.range(4).map((i) => (
                <Dice key={i} actionCost={actionCosts[i]} marketCost={marketCosts[i]} />
              ))}
            </Grid>
            <Typography align="center">{equipment.actionCostText}</Typography>
          </Stack>
          <Stack direction="column" flexGrow={1}>
            <Typography align="center" variant="h6">
              {equipment.name}
            </Typography>
            <Stack alignItems="center" justifyContent="center" flexGrow={1}>
              <Typography>{equipment.action}</Typography>
            </Stack>
          </Stack>
        </CardContent>
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
        width="18mm"
        height="18mm"
        margin="3.5mm"
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

const Card = styled('div')({
  width: '88mm',
  height: '63mm',
  backgroundColor: '#fff',
  padding: '2mm',
})

const CardContent = styled(Stack)({
  backgroundColor: '#eee',
  borderRadius: '5mm',
  margin: '1mm',
  height: 'calc(100% - 2mm)',
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
    default:
      return 'white'
  }
}
