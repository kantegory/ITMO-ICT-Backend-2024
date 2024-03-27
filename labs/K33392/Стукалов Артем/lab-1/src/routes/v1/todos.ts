import { ServerT } from 'config/server'
import * as TodoControllersV1 from 'controllers/v1/todos'
import * as TodoSchemaV1 from 'schemas/v1/todos'

export function setUpV1TodoRoutes(server: ServerT): void {
  server.route({
    method: 'GET',
    url: '/getById',
    schema: TodoSchemaV1.getById,
    handler: TodoControllersV1.getById,
  })

  server.route({
    method: 'POST',
    url: '/create',
    schema: TodoSchemaV1.create,
    handler: TodoControllersV1.create,
  })

  server.route({
    method: 'GET',
    url: '/get',
    schema: TodoSchemaV1.get,
    handler: TodoControllersV1.get,
  })
}
