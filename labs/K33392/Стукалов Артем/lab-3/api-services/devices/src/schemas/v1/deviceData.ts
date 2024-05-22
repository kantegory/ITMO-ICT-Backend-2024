import { DeviceDataSchema as DeviceDataModelSchema } from '@repo/shared/modelSchemas'

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
} satisfies FastifySchema
