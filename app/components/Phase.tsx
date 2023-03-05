import type { SxProps, Theme } from '@mui/material'
import { Stack, styled } from '@mui/material'
import Marked from './Marked'
import phaseImg from '~/assets/phase.webp'

interface Props {
  value: number
  sx?: SxProps<Theme>
}

export default function Phase({ sx, value }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" sx={sx}>
      <Card>
        <CardContent direction="row">
          <Name>{`PHASE ${value}`}</Name>
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
  backgroundImage: `url(${phaseImg})`,
})

const Name = styled(Marked)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: '700',
  fontSize: '2em',
  top: '66mm',
  left: 0,
  right: 0,
})
