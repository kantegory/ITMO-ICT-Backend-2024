import { TodoSchema as TodoModelSchema } from 'modelSchemas'

import { FastifySchema } from 'fastify'
import { z } from 'zod'

export const getById = {
  querystring: z.object({
    id: z.coerce.number().min(1),
  }),
  response: {
    200: z.object({
      todo: TodoModelSchema,
    }),
  },
} satisfies FastifySchema

export const create = {
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
  response: {
    200: z.object({
      todo: TodoModelSchema,
    }),
  },
} satisfies FastifySchema

export const get = {
  querystring: z.object({
    count: z.coerce.number().min(0),
    offset: z.coerce.number().min(0),
  }),
  response: {
    200: z.object({
      todos: z.array(TodoModelSchema),
      count: z.number().min(0),
    }),
  },
} satisfies FastifySchema
