import { ServerT } from 'config/server'
import { setUpV1Routes } from 'routes/v1'

export function setUpRoutes(server: ServerT): void {
  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1Routes(server)
      done()
    },
    {
      prefix: '/v1',
    },
  )
}
