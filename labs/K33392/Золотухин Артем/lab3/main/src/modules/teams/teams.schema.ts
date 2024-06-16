// team.schema.ts
import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createTeamSchema = z.object({
  name: z.string(),
  // Допустим, у нас есть массив ID пользователей, входящих в команду
  memberIds: z.array(z.number()).optional(),
})

const updateTeamSchema = createTeamSchema.partial()

const teamResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  memberIds: z.array(z.number()).optional(),
})

export const { schemas: teamSchemas, $ref } = buildJsonSchemas(
  {
    createTeamSchema,
    updateTeamSchema,
    teamResponseSchema,
  },
  { $id: 'teamSchemas' }
)

// Infer the types from the schemas
export type CreateTeamInput = z.infer<typeof createTeamSchema>
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>
export type TeamResponse = z.infer<typeof teamResponseSchema>
