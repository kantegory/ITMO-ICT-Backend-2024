import { ServerT } from '../server'
import { setUpV1Routes } from './v1/index'

export function setUpRoutes(server: ServerT): void {
  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1Routes(server)
      done()
    },
    {
      prefix: '/v1',
    }
  )
}
