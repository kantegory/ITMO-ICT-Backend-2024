import { CommandSchema as CommandModelSchema } from 'modelSchemas'

import { FastifySchema } from 'fastify'

export const execute = {
  body: CommandModelSchema.pick({
    status: true,
    params: true,
    deviceId: true,
    baseCommandId: true,
  }),
  response: {
    200: CommandModelSchema,
  },
  description: 'Пример документации swagger',
  security: [
    {
      Bearer: [],
    },
  ],
} satisfies FastifySchema
