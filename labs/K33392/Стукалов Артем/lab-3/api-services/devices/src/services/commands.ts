import { CommandSchema as CommandModelSchema } from '@repo/shared/modelSchemas'

import { logger } from '@repo/shared/fastify'
import { Command, prisma } from '@repo/shared/db'
import { z } from 'zod'

const executeData = CommandModelSchema.pick({
  status: true,
  params: true,
  deviceId: true,
  baseCommandId: true,
})
export async function executeCommand(
  data: z.infer<typeof executeData>,
  userId: number
): Promise<Command> {
  const command = await prisma.command.create({
    data: {
      ...data,
      userId,
      status: data.status || {},
      params: data.params || {},
      ts: Math.floor(Date.now() / 1000),
    },
  })
  logger.info(
    `EXECUTE command: ${command.id} ${command.deviceId} ${command.status} ${command.userId}`
  )
  return command
}
