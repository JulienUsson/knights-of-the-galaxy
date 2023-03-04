import { Stack, TextField } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'

export default function EquipmentForm(props: Partial<EquipmentEntity>) {
  return (
    <Stack direction="column" spacing={1}>
      <TextField name="name" defaultValue={props.name} label="Nom" required />
      <TextField name="actionCost" defaultValue={props.actionCost} label="Coût action" required />
      <TextField name="marketCost" defaultValue={props.marketCost} label="Coût marché" required />
      <TextField name="action" defaultValue={props.action} label="Action" required />
    </Stack>
  )
}
