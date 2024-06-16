import { DeviceDataSchema as DeviceDataModelSchema } from 'modelSchemas'

import { FastifySchema } from 'fastify'
import { z } from 'zod'

export const log = {
  body: DeviceDataModelSchema.pick({
    status: true,
    deviceId: true,
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
