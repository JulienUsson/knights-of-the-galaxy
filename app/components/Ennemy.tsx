import type { SxProps, Theme } from '@mui/material'
import { Typography } from '@mui/material'
import { Stack, styled } from '@mui/material'
import type { Ennemy as EnnemyEntity } from '@prisma/client'
import { marked } from 'marked'

interface Props extends Partial<EnnemyEntity> {
  sx?: SxProps<Theme>
}

export default function Ennemy({ sx, ...ennemy }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" sx={sx}>
      <Card>
        <CardContent direction="row">
          {ennemy.description && (
            <Typography dangerouslySetInnerHTML={{ __html: marked(ennemy.description) }} />
          )}
        </CardContent>
      </Card>
    </Stack>
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
  borderRadius: '2mm',
  margin: '1mm',
  height: 'calc(100% - 2mm)',
})
