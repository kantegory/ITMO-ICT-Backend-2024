import { UserSchema as UserModelSchema } from 'modelSchemas'

import { FastifySchema } from 'fastify'
import { z } from 'zod'

export const register = {
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
  response: {
    200: UserModelSchema.omit({
      pass_hash: true,
      pass_salt: true,
    }),
  },
} satisfies FastifySchema

export const login = {
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
  response: {
    200: z.object({
      token: z.string(),
    }),
  },
} satisfies FastifySchema

export const getSelf = {
  response: {
    200: UserModelSchema.omit({
      pass_hash: true,
      pass_salt: true,
    }),
  },
  security: [
    {
      Bearer: [],
    },
  ],
} satisfies FastifySchema
