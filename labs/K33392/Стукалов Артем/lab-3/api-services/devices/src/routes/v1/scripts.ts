import { ServerT } from '../../server'
import * as ScriptsControllersV1 from '../../controllers/v1/scripts'
import * as ScriptsSchemaV1 from '../../schemas/v1/scripts'

export function setUpV1ScriptsRoutes(server: ServerT): void {
  server.route({
    method: 'POST',
    url: '/create',
    preHandler: [server.authenticate],
    schema: ScriptsSchemaV1.create,
    handler: ScriptsControllersV1.create,
  })
}
