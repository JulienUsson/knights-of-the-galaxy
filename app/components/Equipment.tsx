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

function RedLayout({ description }: Partial<EquipmentEntity>) {
  return (
    <CardContent sx={{ backgroundImage: `url(${red1Layout})` }}>
      {description && (
        <Marked
          sx={{ position: 'absolute', top: '6mm', left: '27mm', right: '6mm', bottom: '4mm' }}
        >
          {description}
        </Marked>
      )}
    </CardContent>
  )
}

function OrangeLayout({}: Partial<EquipmentEntity>) {
  return <CardContent sx={{ backgroundImage: `url(${orange1Layout})` }}></CardContent>
}
