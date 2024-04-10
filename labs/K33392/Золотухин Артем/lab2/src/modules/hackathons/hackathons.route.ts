import { FastifyInstance } from 'fastify'
import {
  createHackathonHandler,
  getAllHackathonsHandler,
  getHackathonHandler,
  updateHackathonHandler,
  deleteHackathonHandler,
} from './hackathons.controller'
import {
  $ref,
  CreateHackathonInput,
  UpdateHackathonInput,
} from './hackathons.schema'

const hackathonRoutes = async (server: FastifyInstance) => {
  server.post<{ Body: CreateHackathonInput }>('/', {
    schema: {
      body: $ref('createHackathonSchema'),
      response: { 201: $ref('hackathonResponseSchema') },
    },
    handler: createHackathonHandler,
  })

  server.get('/', {
    handler: getAllHackathonsHandler,
  })

  server.get('/:id', {
    handler: getHackathonHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateHackathonInput }>('/:id', {
    schema: {
      body: $ref('updateHackathonSchema'),
      response: { 200: $ref('hackathonResponseSchema') },
    },
    handler: updateHackathonHandler,
  })

  server.delete('/:id', {
    handler: deleteHackathonHandler,
  })
}

export default hackathonRoutes
