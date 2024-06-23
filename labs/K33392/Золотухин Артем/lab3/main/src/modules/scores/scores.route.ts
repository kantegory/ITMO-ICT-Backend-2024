// score.route.ts
import { FastifyInstance } from 'fastify'
import {
  createScoreHandler,
  getScoresByProjectIdHandler,
  updateScoreHandler,
  deleteScoreHandler,
} from './scores.controller'
import { $ref, CreateScoreInput, UpdateScoreInput } from './scores.schema'

const scoreRoutes = async (server: FastifyInstance) => {
  server.post<{ Body: CreateScoreInput }>('/', {
    schema: {
      tags: ['scores'],
      body: $ref('createScoreSchema'),
      response: { 201: $ref('scoreResponseSchema') },
    },
    handler: createScoreHandler,
  })

  server.get<{ Params: { projectId: number } }>('/:projectId', {
    schema: {
      tags: ['scores'],
    },
    handler: getScoresByProjectIdHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateScoreInput }>('/:id', {
    schema: {
      tags: ['scores'],
      body: $ref('updateScoreSchema'),
      response: { 200: $ref('scoreResponseSchema') },
    },
    handler: updateScoreHandler,
  })

  server.delete<{ Params: { id: number } }>('/:id', {
    schema: {
      tags: ['scores'],
    },
    handler: deleteScoreHandler,
  })
}

export default scoreRoutes
