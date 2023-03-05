import type { SxProps, Theme } from '@mui/material'
import { Stack, styled } from '@mui/material'
import type { Ennemy as EnnemyEntity } from '@prisma/client'

import ennemyLayout from '~/assets/ennemy.png'
import Marked from './Marked'

interface Props extends Partial<EnnemyEntity> {
  sx?: SxProps<Theme>
}

export default function Ennemy({ sx, description }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" sx={sx}>
      <Card>
        <CardContent direction="row">
          <Description
            sx={{ position: 'absolute', top: '13mm', left: '6mm', right: '6mm', bottom: '12mm' }}
          >
            {description ?? ''}
          </Description>
        </CardContent>
      </Card>
    </Stack>
  )
}

const Card = styled('div')({
  height: '88mm',
  width: '63mm',
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
  backgroundImage: `url(${ennemyLayout})`,
})
const Description = styled(Marked)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#212121',
})
