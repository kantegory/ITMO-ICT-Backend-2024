import { server } from './server'
import { prisma } from '@repo/shared/db'
import { logger } from '@repo/shared/fastify'
import { setupMiddlewares } from './middlewares'
import { setUpRoutes } from './routes'
import { setUpAMQPChannel } from './amqp'

const start = async () => {
  setupMiddlewares(server)
  setUpRoutes(server)

  await setUpAMQPChannel()

  const shutdown = async () => {
    await Promise.all([server.close(), prisma.$disconnect()])
    process.exit(0)
  }

  try {
    await server.ready()
    await server.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    logger.error(err)
    await shutdown()
  }

  process.once('SIGINT', async () => await shutdown())
  process.once('SIGTERM', async () => await shutdown())
}

start()
