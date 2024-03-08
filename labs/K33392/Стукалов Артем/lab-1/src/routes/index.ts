import { ServerT } from 'config/server'
import { setUpTodoRoutes } from 'routes/todos'

export function setUpRoutes(server: ServerT): void {
  server.register(setUpTodoRoutes, {
    prefix: '/todos',
  })
}
