import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createCommentSchema = z.object({
  projectId: z.number(),
  userId: z.number(),
  content: z.string(),
})

const updateCommentSchema = z.object({
  content: z.string(),
})

const commentResponseSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  userId: z.number(),
  content: z.string(),
})

export const { schemas: commentSchemas, $ref } = buildJsonSchemas(
  {
    createCommentSchema,
    updateCommentSchema,
    commentResponseSchema,
  },
  { $id: 'commentSchemas' }
)

export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
export type CommentResponse = z.infer<typeof commentResponseSchema>
