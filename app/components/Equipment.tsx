import type { SxProps, Theme } from '@mui/material'
import { Stack, styled } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'

import blueLayout from '~/assets/blue.jpg'
import greenLayout from '~/assets/green.jpg'
import yellowLayout from '~/assets/yellow.jpg'
import Marked from './Marked'

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
            case 'red':
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

function GreenLayout({ description }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${greenLayout})` }}>
      {description && (
        <Marked sx={{ position: 'absolute', top: '6mm', left: '6mm', right: '6mm', bottom: '5mm' }}>
          {description}
        </Marked>
      )}
    </CardContent>
  )
}

function BlueLayout({ description }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${blueLayout})` }}>
      {description && (
        <Marked sx={{ position: 'absolute', top: '6mm', left: '6mm', right: '6mm', bottom: '5mm' }}>
          {description}
        </Marked>
      )}
    </CardContent>
  )
}

function YellowLayout({ description }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${yellowLayout})` }}>
      {description && (
        <Marked
          sx={{ position: 'absolute', top: '27mm', left: '6mm', right: '6mm', bottom: '5mm' }}
        >
          {description}
        </Marked>
      )}
    </CardContent>
  )
}
