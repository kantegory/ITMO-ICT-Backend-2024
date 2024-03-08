import { ServerT } from 'config/server'
import * as TodoControllers from 'controllers/todos'
import * as TodoSchema from 'schemas/todos'

import { FastifyPluginOptions } from 'fastify'

export function setUpTodoRoutes(
  server: ServerT,
  _: FastifyPluginOptions,
  done: (err?: Error) => void,
): void {
  server.route({
    method: 'GET',
    url: '/:id',
    schema: TodoSchema.getById,
    handler: TodoControllers.getById,
  })

  done()
}
