import { ServerT } from '../../server'
import * as UsersControllersV1 from '../../controllers/v1/users'
import * as UsersSchemaV1 from '../../schemas/v1/users'

export function setUpV1UserRoutes(server: ServerT): void {
  server.route({
    method: 'POST',
    url: '/register',
    schema: UsersSchemaV1.register,
    handler: UsersControllersV1.register,
  })

  server.route({
    method: 'POST',
    url: '/login',
    schema: UsersSchemaV1.login,
    handler: UsersControllersV1.login,
  })

  server.route({
    method: 'GET',
    url: '/getSelf',
    schema: UsersSchemaV1.getSelf,
    preHandler: [server.authenticate],
    handler: UsersControllersV1.getSelf,
  })
}
