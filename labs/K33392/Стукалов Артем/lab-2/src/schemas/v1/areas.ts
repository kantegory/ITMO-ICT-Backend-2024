import { AreaSchema as AreaModelSchema } from 'modelSchemas'

import { FastifySchema } from 'fastify'
import { z } from 'zod'

export const get = {
  querystring: z.object({
    count: z.coerce.number().min(0),
    offset: z.coerce.number().min(0),
  }),
  response: {
    200: z.object({
      areas: z.array(AreaModelSchema),
      count: z.number().min(0),
    }),
  },
  security: [
    {
      Bearer: [],
    },
  ],
} satisfies FastifySchema

export const getById = {
  querystring: z.object({
    id: z.coerce.number().min(1),
  }),
  response: {
    200: z.object({
      area: AreaModelSchema,
    }),
  },
  security: [
    {
      Bearer: [],
    },
  ],
} satisfies FastifySchema

export const create = {
  body: AreaModelSchema.pick({
    name: true,
    description: true,
    type: true,
  }),
  response: {
    200: AreaModelSchema,
  },
  security: [
    {
      Bearer: [],
    },
  ],
} satisfies FastifySchema

export const addDevice = {
  body: z.object({
    areaId: z.coerce.number().min(1),
    deviceId: z.coerce.number().min(1),
  }),
  response: {
    200: z.object({
      res: z.boolean(),
    }),
  },
  security: [
    {
      Bearer: [],
    },
  ],
} satisfies FastifySchema

export const removeDevice = {
  body: z.object({
    areaId: z.coerce.number().min(1),
    deviceId: z.coerce.number().min(1),
  }),
  response: {
    200: z.object({
      res: z.boolean(),
    }),
  },
  security: [
    {
      Bearer: [],
    },
  ],
} satisfies FastifySchema
