import { ServerT } from 'config/server'
import * as DevicesControllersV1 from 'controllers/v1/devices'
import * as DevicesSchemaV1 from 'schemas/v1/devices'

export function setUpV1DeviceRoutes(server: ServerT): void {
  server.route({
    method: 'GET',
    url: '/getById',
    preHandler: [server.authenticate],
    schema: DevicesSchemaV1.getById,
    handler: DevicesControllersV1.getById,
  })

  server.route({
    method: 'GET',
    url: '/get',
    preHandler: [server.authenticate],
    schema: DevicesSchemaV1.get,
    handler: DevicesControllersV1.get,
  })

  server.route({
    method: 'POST',
    url: '/create',
    preHandler: [server.authenticate],
    schema: DevicesSchemaV1.create,
    handler: DevicesControllersV1.create,
  })

  server.route({
    method: 'POST',
    url: '/link',
    preHandler: [server.authenticate],
    schema: DevicesSchemaV1.link,
    handler: DevicesControllersV1.link,
  })

  server.route({
    method: 'POST',
    url: '/deLink',
    preHandler: [server.authenticate],
    schema: DevicesSchemaV1.deLink,
    handler: DevicesControllersV1.deLink,
  })
}
