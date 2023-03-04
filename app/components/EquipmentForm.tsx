import { TextField } from '@mui/material'
import type { Equipment as EquipmentEntity } from '@prisma/client'

export default function EquipmentForm(props: Partial<EquipmentEntity>) {
  return (
    <>
      <TextField name="title" defaultValue={props.title} label="Title" required />
    </>
  )
}
