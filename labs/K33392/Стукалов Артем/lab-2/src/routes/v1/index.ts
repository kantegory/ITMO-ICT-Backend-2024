import { ServerT } from 'config/server'
import { setUpV1AreaRoutes } from 'routes/v1/areas'
import { setUpV1DeviceRoutes } from 'routes/v1/devices'
import { setUpV1UserRoutes } from 'routes/v1/users'

export function setUpV1Routes(server: ServerT): void {
  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1UserRoutes(server)
      done()
    },
    {
      prefix: '/users',
    },
  )

  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1DeviceRoutes(server)
      done()
    },
    {
      prefix: '/devices',
    },
  )

  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1AreaRoutes(server)
      done()
    },
    {
      prefix: '/areas',
    },
  )
}
