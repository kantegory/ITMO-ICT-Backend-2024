import { ServerT } from 'config/server'
import * as DevicesDataControllersV1 from 'controllers/v1/deviceData'
import * as DevicesDataSchemaV1 from 'schemas/v1/deviceData'

export function setUpV1DeviceDataRoutes(server: ServerT): void {
  server.route({
    method: 'POST',
    url: '/log',
    preHandler: [server.authenticate],
    schema: DevicesDataSchemaV1.log,
    handler: DevicesDataControllersV1.log,
  })
}
