import type { SxProps, Theme } from '@mui/material'
import { Stack, styled } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'

import blueLayout from '~/assets/blue.jpg'
import greenLayout from '~/assets/green.jpg'
import yellowLayout from '~/assets/yellow.jpg'
import red1Layout from '~/assets/red1.jpg'
import red2Layout from '~/assets/red2.jpg'
import red3Layout from '~/assets/red3.jpg'
import orange1Layout from '~/assets/orange1.jpg'
import orange2Layout from '~/assets/orange2.jpg'
import orange3Layout from '~/assets/orange3.jpg'
import Marked from '~/components/Marked'

interface Props extends Partial<EquipmentEntity> {
  sx?: SxProps<Theme>
}

export default function Equipment({ sx, ...equipment }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" sx={sx}>
      <Card>
        {(() => {
          switch (equipment.type) {
            case 'blue':
              return <BlueLayout {...equipment} />
            case 'green':
              return <GreenLayout {...equipment} />
            case 'orange':
              return <OrangeLayout {...equipment} />
            case 'red':
              return <RedLayout {...equipment} />
            case 'yellow':
              return <YellowLayout {...equipment} />
          }
        })()}
      </Card>
    </Stack>
  )
}

const Card = styled('div')({
  width: '88mm',
  height: '63mm',
  backgroundColor: '#fff',
  padding: '2mm',
  '& *': {
    fontFamily: "'Orbitron', sans-serif !important",
  },
})

const CardContent = styled(Stack)({
  position: 'relative',
  borderRadius: '2mm',
  margin: '1mm',
  height: 'calc(100% - 2mm)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
})

const Description = styled(Marked)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Dice = styled(Marked)({
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '700',
})

function GreenLayout({ description }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${greenLayout})` }}>
      <Description
        sx={{ position: 'absolute', top: '6mm', left: '6mm', right: '6mm', bottom: '5mm' }}
      >
        {description ?? ''}
      </Description>
    </CardContent>
  )
}

function BlueLayout({ description }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${blueLayout})` }}>
      <Description
        sx={{ position: 'absolute', top: '6mm', left: '6mm', right: '6mm', bottom: '5mm' }}
      >
        {description ?? ''}
      </Description>
    </CardContent>
  )
}

function YellowLayout({ description, dice1, dice2, dice3 }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${yellowLayout})` }}>
      <Description
        sx={{ position: 'absolute', top: '27mm', left: '6mm', right: '6mm', bottom: '5mm' }}
      >
        {description ?? ''}
      </Description>
      <Dice sx={{ position: 'absolute', top: '8mm', left: '6mm', right: '63mm', bottom: '36mm' }}>
        {dice1 ?? ''}
      </Dice>
      <Dice sx={{ position: 'absolute', top: '8mm', left: '35mm', right: '35mm', bottom: '36mm' }}>
        {dice2 ?? ''}
      </Dice>
      <Dice sx={{ position: 'absolute', top: '8mm', left: '62mm', right: '7mm', bottom: '36mm' }}>
        {dice3 ?? ''}
      </Dice>
    </CardContent>
  )
}

function RedLayout({ description }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${red1Layout})` }}>
      <Description
        sx={{ position: 'absolute', top: '6mm', left: '27mm', right: '6mm', bottom: '4mm' }}
      >
        {description ?? ''}
      </Description>
    </CardContent>
  )
}

function OrangeLayout({ dice1, dice2, dice3 }: Partial<EquipmentEntity>) {
  if (dice3) {
    return (
      <CardContent sx={{ backgroundImage: `url(${orange3Layout})` }}>
        <Dice
          sx={{
            position: 'absolute',
            top: '22mm',
            left: '7mm',
            right: '62mm',
            bottom: '22mm',
          }}
        >
          {dice1 ?? ''}
        </Dice>
        <Dice
          sx={{
            position: 'absolute',
            top: '22mm',
            left: '35mm',
            right: '35mm',
            bottom: '22mm',
          }}
        >
          {dice2 ?? ''}
        </Dice>
        <Dice
          sx={{
            position: 'absolute',
            top: '22mm',
            left: '62mm',
            right: '7mm',
            bottom: '22mm',
          }}
        >
          {dice3 ?? ''}
        </Dice>
      </CardContent>
    )
  } else if (dice2) {
    return (
      <CardContent sx={{ backgroundImage: `url(${orange2Layout})` }}>
        <Dice
          sx={{
            position: 'absolute',
            top: '22mm',
            left: '21mm',
            right: '49mm',
            bottom: '22mm',
          }}
        >
          {dice1 ?? ''}
        </Dice>
        <Dice
          sx={{
            position: 'absolute',
            top: '22mm',
            left: '50mm',
            right: '20mm',
            bottom: '22mm',
          }}
        >
          {dice2 ?? ''}
        </Dice>
      </CardContent>
    )
  } else {
    return (
      <CardContent sx={{ backgroundImage: `url(${orange1Layout})` }}>
        <Dice
          sx={{
            position: 'absolute',
            top: '22mm',
            left: '35mm',
            right: '35mm',
            bottom: '22mm',
          }}
        >
          {dice1 ?? ''}
        </Dice>
      </CardContent>
    )
  }
}
