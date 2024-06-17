// project.schema.ts
import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  hackathonId: z.number(),
  teamId: z.number().optional(),
})

const updateProjectSchema = createProjectSchema.partial()

const projectResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  hackathonId: z.number(),
  teamId: z.number().optional(),
})

export const { schemas: projectSchemas, $ref } = buildJsonSchemas(
  {
    createProjectSchema,
    updateProjectSchema,
    projectResponseSchema,
  },
  { $id: 'projectSchemas' }
)

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type ProjectResponse = z.infer<typeof projectResponseSchema>
