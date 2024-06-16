import { DeviceSchema as DeviceModelSchema } from '@repo/shared/modelSchemas'

import { FastifySchema } from 'fastify'
import { z } from 'zod'

export const get = {
  querystring: z.object({
    count: z.coerce.number().min(0),
    offset: z.coerce.number().min(0),
  }),
  response: {
    200: z.object({
      devices: z.array(DeviceModelSchema),
      count: z.number().min(0),
    }),
  },
} satisfies FastifySchema

export const getById = {
  querystring: z.object({
    id: z.coerce.number().min(1),
  }),
  response: {
    200: z.object({
      device: DeviceModelSchema,
    }),
  },
} satisfies FastifySchema

export const link = {
  body: z.object({
    uuid: z.coerce.string(),
  }),
  response: {
    200: z.object({
      res: z.boolean(),
    }),
  },
} satisfies FastifySchema

export const deLink = {
  body: z.object({
    id: z.coerce.number().min(1),
  }),
  response: {
    200: z.object({
      res: z.boolean(),
    }),
  },
} satisfies FastifySchema

export const create = {
  body: DeviceModelSchema.pick({
    name: true,
    description: true,
    type: true,
    uuid: true,
  }),
  response: {
    200: DeviceModelSchema,
  },
} satisfies FastifySchema
