import { z } from 'zod'

export const ennemySchema = z.object({
  name: z.string(),
  type: z.string(),
  phase: z.string().transform(Number),
  image: z.string().optional(),
  life: z.string().optional(),
  attack: z.string().optional(),
  description: z.string(),
})

export type EnnemyFields = z.infer<typeof ennemySchema>
