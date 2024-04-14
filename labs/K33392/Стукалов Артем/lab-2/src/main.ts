import { prisma } from 'config/db'
import { LISTEN_HOST, LISTEN_PORT } from 'config/env'
import { logger } from 'config/logger'
import { server } from 'config/server'
import { setupMiddlewares } from 'middlewares/index'
import { setUpRoutes } from 'routes/index'

const start = async () => {
  setupMiddlewares(server)
  setUpRoutes(server)

  const shutdown = async () => {
    await Promise.all([server.close(), prisma.$disconnect()])
    process.exit(0)
  }

  try {
    await server.ready()
    await server.listen({ port: LISTEN_PORT, host: LISTEN_HOST })
  } catch (err) {
    logger.error(err)
    await shutdown()
  }

  process.once('SIGINT', async () => await shutdown())
  process.once('SIGTERM', async () => await shutdown())
}

start()
