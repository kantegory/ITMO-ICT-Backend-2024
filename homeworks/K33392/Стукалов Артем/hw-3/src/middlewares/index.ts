import { ServerT } from 'config/server'
import { setupErrorHandler } from 'middlewares/errors'

export function setupMiddlewares(server: ServerT): void {
  setupErrorHandler(server)
}
