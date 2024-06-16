import { ServerT } from '../../server'
import * as CommandsControllersV1 from '../../controllers/v1/commands'
import * as CommandsSchemaV1 from '../../schemas/v1/commands'

export function setUpV1CommandsRoutes(server: ServerT): void {
  server.route({
    method: 'POST',
    url: '/execute',
    preHandler: [server.authenticate],
    schema: CommandsSchemaV1.execute,
    handler: CommandsControllersV1.execute,
  })
}
