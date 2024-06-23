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
      tags: ['hackathons'],
      body: $ref('createHackathonSchema'),
      response: { 201: $ref('hackathonResponseSchema') },
    },
    handler: createHackathonHandler,
  })

  server.get('/', {
    schema: {
      tags: ['hackathons'],
    },
    handler: getAllHackathonsHandler,
  })

  server.get('/:id', {
    schema: {
      tags: ['hackathons'],
    },
    handler: getHackathonHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateHackathonInput }>('/:id', {
    schema: {
      tags: ['hackathons'],
      body: $ref('updateHackathonSchema'),
      response: { 200: $ref('hackathonResponseSchema') },
    },
    handler: updateHackathonHandler,
  })

  server.delete('/:id', {
    schema: {
      tags: ['hackathons'],
    },
    handler: deleteHackathonHandler,
  })
}

export default hackathonRoutes
