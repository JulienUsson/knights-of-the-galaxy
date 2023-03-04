import { z } from 'zod'

export const equipmentSchema = z.object({
  name: z.string(),
  type: z.string(),
  dice1: z.string().optional(),
  dice2: z.string().optional(),
  dice3: z.string().optional(),
  description: z.string(),
})

export type EquipmentFields = z.infer<typeof equipmentSchema>
