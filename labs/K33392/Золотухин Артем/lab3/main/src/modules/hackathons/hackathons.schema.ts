import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createHackathonSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
})

const updateHackathonSchema = createHackathonSchema.partial()

const hackathonResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
})

export const { schemas: hackathonSchemas, $ref } = buildJsonSchemas(
  {
    createHackathonSchema,
    updateHackathonSchema,
    hackathonResponseSchema,
  },
  { $id: 'hackathonSchemas' }
)

export type CreateHackathonInput = z.infer<typeof createHackathonSchema>
export type UpdateHackathonInput = z.infer<typeof updateHackathonSchema>
export type HackathonResponse = z.infer<typeof hackathonResponseSchema>
