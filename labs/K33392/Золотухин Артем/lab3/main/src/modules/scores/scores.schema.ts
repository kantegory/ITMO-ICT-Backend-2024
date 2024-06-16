import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createScoreSchema = z.object({
  projectId: z.number(),
  userId: z.number(),
  score: z.number().min(0).max(100),
})

const updateScoreSchema = z.object({
  score: z.number().min(0).max(100),
})

const scoreResponseSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  userId: z.number(),
  score: z.number(),
})

export const { schemas: scoreSchemas, $ref } = buildJsonSchemas(
  {
    createScoreSchema,
    updateScoreSchema,
    scoreResponseSchema,
  },
  { $id: 'scoreSchemas' }
)

// Infer the types from the schemas
export type CreateScoreInput = z.infer<typeof createScoreSchema>
export type UpdateScoreInput = z.infer<typeof updateScoreSchema>
export type ScoreResponse = z.infer<typeof scoreResponseSchema>
