import { ServerT } from '../server'
import { setupErrorHandler } from './errors'

export function setupMiddlewares(server: ServerT): void {
  setupErrorHandler(server)
}
