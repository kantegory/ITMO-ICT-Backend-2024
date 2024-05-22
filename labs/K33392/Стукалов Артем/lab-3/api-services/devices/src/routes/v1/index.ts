import { ServerT } from '../../server'
import { setUpV1AreaRoutes } from './areas'
import { setUpV1CommandsRoutes } from './commands'
import { setUpV1DeviceDataRoutes } from './deviceData'
import { setUpV1DeviceRoutes } from './devices'
import { setUpV1ScriptsRoutes } from './scripts'

export function setUpV1Routes(server: ServerT): void {
  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1DeviceRoutes(server)
      done()
    },
    {
      prefix: '/devices',
    }
  )

  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1AreaRoutes(server)
      done()
    },
    {
      prefix: '/areas',
    }
  )

  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1DeviceDataRoutes(server)
      done()
    },
    {
      prefix: '/deviceData',
    }
  )

  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1CommandsRoutes(server)
      done()
    },
    {
      prefix: '/commands',
    }
  )
  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1ScriptsRoutes(server)
      done()
    },
    {
      prefix: '/scripts',
    }
  )
}
