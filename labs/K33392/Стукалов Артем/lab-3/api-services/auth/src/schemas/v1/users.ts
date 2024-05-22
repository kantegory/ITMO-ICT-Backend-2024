import { UserSchema as UserModelSchema } from '@repo/shared/modelSchemas'
import { FastifySchema } from 'fastify'
import { z } from 'zod'

export const register = {
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
  response: {
    200: UserModelSchema.omit({
      passHash: true,
      passSalt: true,
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
      passHash: true,
      passSalt: true,
    }),
  },
} satisfies FastifySchema
