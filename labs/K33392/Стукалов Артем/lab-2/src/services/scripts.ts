import { prisma } from 'config/db'
import { ScriptSchema as ScriptModelSchema } from 'modelSchemas'

import { Script } from '@prisma/client'
import { z } from 'zod'

const executeData = ScriptModelSchema.pick({
  name: true,
  description: true,
  conditionParams: true,
  commandParams: true,
  conditionDeviceId: true,
  commandDeviceId: true,
  baseCommandId: true,
})
export async function create(
  data: z.infer<typeof executeData>,
  userId: number,
): Promise<Script> {
  const script = await prisma.script.create({
    data: {
      ...data,
      userId,
      commandParams: data.commandParams || {},
      conditionParams: data.conditionParams || {},
    },
  })
  return script
}
