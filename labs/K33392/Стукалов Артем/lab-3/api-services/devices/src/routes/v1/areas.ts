import { ServerT } from '../../server'
import * as AreasControllersV1 from '../../controllers/v1/areas'
import * as AreasSchemaV1 from '../../schemas/v1/areas'

export function setUpV1AreaRoutes(server: ServerT): void {
  server.route({
    method: 'GET',
    url: '/getById',
    preHandler: [server.authenticate],
    schema: AreasSchemaV1.getById,
    handler: AreasControllersV1.getById,
  })

  server.route({
    method: 'GET',
    url: '/get',
    preHandler: [server.authenticate],
    schema: AreasSchemaV1.get,
    handler: AreasControllersV1.get,
  })

  server.route({
    method: 'POST',
    url: '/create',
    preHandler: [server.authenticate],
    schema: AreasSchemaV1.create,
    handler: AreasControllersV1.create,
  })

  server.route({
    method: 'POST',
    url: '/addDevice',
    preHandler: [server.authenticate],
    schema: AreasSchemaV1.addDevice,
    handler: AreasControllersV1.addDevice,
  })

  server.route({
    method: 'POST',
    url: '/removeDevice',
    preHandler: [server.authenticate],
    schema: AreasSchemaV1.removeDevice,
    handler: AreasControllersV1.removeDevice,
  })
}
