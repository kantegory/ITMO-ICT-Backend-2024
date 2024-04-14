import { ServerT } from 'config/server'
// import { setUpV1TodoRoutes } from 'routes/v1/todos'
import { setUpV1UserRoutes } from 'routes/v1/users'

export function setUpV1Routes(server: ServerT): void {
  // server.register(
  //   (server: ServerT, _opts, done) => {
  //     setUpV1TodoRoutes(server)
  //     done()
  //   },
  //   {
  //     prefix: '/todos',
  //   },
  // )

  server.register(
    (server: ServerT, _opts, done) => {
      setUpV1UserRoutes(server)
      done()
    },
    {
      prefix: '/users',
    },
  )
}
