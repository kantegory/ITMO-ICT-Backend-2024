import { ServerT } from 'config/server'
import { setUpV1TodoRoutes } from 'routes/v1/todos'

export function setUpV1Routes(server: ServerT): void {
  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1TodoRoutes(server)
      done()
    },
    {
      prefix: '/todos',
    },
  )
}
