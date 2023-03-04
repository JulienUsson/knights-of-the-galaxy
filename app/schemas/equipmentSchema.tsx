import { z } from 'zod'

export const equipmentSchema = z.object({
  name: z.string(),
  actionCost: z.string(),
  marketCost: z.string(),
  action: z.string(),
})

export type EquipmentFields = z.infer<typeof equipmentSchema>
