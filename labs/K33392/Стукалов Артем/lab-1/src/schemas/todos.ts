import { TodoSchema as TodoModelSchema } from 'modelSchemas'

import { z } from 'zod'

export const getById = {
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      todo: TodoModelSchema,
    }),
  },
}
