import { Stack, TextField } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'

export default function EquipmentForm(props: Partial<EquipmentEntity>) {
  return (
    <Stack direction="column" spacing={2}>
      <TextField name="name" defaultValue={props.name} label="Nom" required />
      <TextField
        name="actionCost"
        defaultValue={props.actionCost}
        label="Coût action"
        helperText="*;3;%2;!2;<4;>5"
        required
      />
      <TextField
        name="actionCostText"
        defaultValue={props.actionCostText}
        label="Texte coût action"
        helperText="=5"
      />
      <TextField
        name="marketCost"
        defaultValue={props.marketCost}
        label="Coût marché"
        helperText="rouge;bleu;vert;noir"
        required
      />
      <TextField name="action" defaultValue={props.action} label="Action" helperText="" required />
    </Stack>
  )
}
