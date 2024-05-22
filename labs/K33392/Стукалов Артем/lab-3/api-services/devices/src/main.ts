import { server } from './server'
import { prisma } from '@repo/shared/db'
import { logger } from '@repo/shared/fastify'
import { setupMiddlewares } from './middlewares'
import { setUpRoutes } from './routes'
import * as AreasService from './services/areas'
import { setUpAMQPChannel, subscribeForMessages } from './amqp'

const start = async () => {
  setupMiddlewares(server)
  setUpRoutes(server)

  await setUpAMQPChannel()
  await subscribeForMessages(async (data) => {
    logger.info(data)
    if (data.kind === undefined) {
      return
    }

    await AreasService.cerate(
      {
        description: 'Это пример комнаты',
        name: 'Моя комната',
        type: 'Room',
      },
      data.userId
    )
  })

  const shutdown = async () => {
    await Promise.all([server.close(), prisma.$disconnect()])
    process.exit(0)
  }

  try {
    await server.ready()
    await server.listen({ port: 3001, host: '0.0.0.0' })
  } catch (err) {
    logger.error(err)
    await shutdown()
  }

  process.once('SIGINT', async () => await shutdown())
  process.once('SIGTERM', async () => await shutdown())
}

start()
