import { ServerT } from '../../server'
import { setUpV1UserRoutes } from './users'

export function setUpV1Routes(server: ServerT): void {
  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1UserRoutes(server)
      done()
    },
    {
      prefix: '/users',
    }
  )
}
