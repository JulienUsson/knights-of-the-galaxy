import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import type { Ennemy as EnnemyEntity } from '@prisma/client'

export default function EnnemyForm(props: Partial<EnnemyEntity>) {
  return (
    <Stack direction="column" spacing={2}>
      <TextField name="name" defaultValue={props.name} label="Nom" required />
      <FormControl>
        <InputLabel id="type">Type</InputLabel>
        <Select name="type" defaultValue={props.type} labelId="type" label="Type" required>
          <MenuItem value="monster">monstre</MenuItem>
          <MenuItem value="building">bâtiment</MenuItem>
          <MenuItem value="event">événement</MenuItem>
        </Select>
      </FormControl>
      <TextField name="image" defaultValue={props.image} label="Image" />
      <TextField name="life" defaultValue={props.life} label="Vie" />
      <TextField name="attack" defaultValue={props.attack} label="Attaque" />
      <TextField
        name="description"
        defaultValue={props.description}
        label="Description"
        multiline
        rows={6}
        required
      />
    </Stack>
  )
}
