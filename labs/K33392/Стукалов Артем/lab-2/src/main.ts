import { prisma } from 'config/db'
import { LISTEN_HOST, LISTEN_PORT } from 'config/env'
import { logger } from 'config/logger'
import { server } from 'config/server'
import { setupMiddlewares } from 'middlewares/index'
import { setUpRoutes } from 'routes/index'
import { scriptsExecutor } from 'utils/scriptsExecutor'

const start = async () => {
  setupMiddlewares(server)
  setUpRoutes(server)

  const shutdown = async () => {
    await Promise.all([server.close(), prisma.$disconnect()])
    scriptsExecutor.destory()
    process.exit(0)
  }

  try {
    await server.ready()

    const scripts = await prisma.script.findMany()
    logger.info(scripts)
    scriptsExecutor.addScripts(scripts)

    await server.listen({ port: LISTEN_PORT, host: LISTEN_HOST })
  } catch (err) {
    logger.error(err)
    await shutdown()
  }

  process.once('SIGINT', async () => await shutdown())
  process.once('SIGTERM', async () => await shutdown())
}

start()
