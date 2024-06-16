import { ScriptSchema as ScriptModelSchema } from '@repo/shared/modelSchemas'

import { FastifySchema } from 'fastify'

export const create = {
  body: ScriptModelSchema.pick({
    name: true,
    description: true,
    conditionParams: true,
    commandParams: true,
    conditionDeviceId: true,
    commandDeviceId: true,
    baseCommandId: true,
  }),
  response: {
    200: ScriptModelSchema,
  },
} satisfies FastifySchema
