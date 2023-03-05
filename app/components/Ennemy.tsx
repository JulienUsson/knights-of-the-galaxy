import type { SxProps, Theme } from '@mui/material'
import { Stack, styled } from '@mui/material'
import type { Ennemy as EnnemyEntity } from '@prisma/client'
import ennemyLayout from '~/assets/ennemy.png'
import Marked from './Marked'

interface Props extends Partial<EnnemyEntity> {
  sx?: SxProps<Theme>
}

export default function Ennemy({ sx, name, description, attack, life, image }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" sx={sx}>
      <Card>
        <CardContent direction="row">
          {image && <Image sx={{ backgroundImage: `url(/assets/${image})` }} />}
          <Layout />
          <Name>{name ?? ''}</Name>
          <Description>{description ?? ''}</Description>
          <Attack>{attack ?? ''}</Attack>
          <Life>{life ?? ''}</Life>
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
})

const Layout = styled('div')({
  position: 'absolute',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage: `url(${ennemyLayout})`,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const Name = styled(Marked)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#212121',
  top: '54mm',
  left: 0,
  right: 0,
})

const Description = styled(Marked)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#212121',
  top: '65mm',
  left: 0,
  right: 0,
  bottom: '1mm',
})

const Attack = styled(Marked)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  top: '1mm',
  left: '45mm',
  right: '5mm',
  bottom: '71mm',
  fontWeight: '700',
})

const Life = styled(Marked)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#212121',
  top: '1mm',
  right: '15mm',
  left: '34mm',
  bottom: '72mm',
  fontWeight: '700',
})

const Image = styled('div')({
  position: 'absolute',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  top: 0,
  left: 0,
  right: 0,
  bottom: '20mm',
})
