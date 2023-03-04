import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'

export default function EquipmentForm(props: Partial<EquipmentEntity>) {
  return (
    <Stack direction="column" spacing={2}>
      <TextField name="name" defaultValue={props.name} label="Nom" required />
      <FormControl>
        <InputLabel id="type">Type</InputLabel>
        <Select name="type" defaultValue={props.type} labelId="type" label="Type" required>
          <MenuItem value="blue">bleu</MenuItem>
          <MenuItem value="green">vert</MenuItem>
          <MenuItem value="orange">orange</MenuItem>
          <MenuItem value="yellow">jaune</MenuItem>
          <MenuItem value="red">rouge</MenuItem>
        </Select>
      </FormControl>
      <TextField name="dice1" defaultValue={props.dice1} label="Dé 1" />
      <TextField name="dice2" defaultValue={props.dice2} label="Dé 2" />
      <TextField name="dice3" defaultValue={props.dice3} label="Dé 3" />
      <TextField name="description" defaultValue={props.description} label="Description" required />
    </Stack>
  )
}
