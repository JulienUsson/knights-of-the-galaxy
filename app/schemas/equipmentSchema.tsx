import { z } from 'zod'

export const equipmentSchema = z.object({
  title: z.string(),
})

export type EquipmentFields = z.infer<typeof equipmentSchema>
