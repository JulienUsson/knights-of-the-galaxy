import type { SxProps, Theme } from '@mui/material'
import { Typography } from '@mui/material'
import { Stack, styled } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'
import { marked } from 'marked'

interface Props extends Partial<EquipmentEntity> {
  sx?: SxProps<Theme>
}

export default function Equipment({ sx, ...equipment }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" sx={sx}>
      <Card>
        <CardContent direction="row">
          {equipment.description && (
            <Typography dangerouslySetInnerHTML={{ __html: marked(equipment.description) }} />
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
