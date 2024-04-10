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
      body: $ref('createScoreSchema'),
      response: { 201: $ref('scoreResponseSchema') },
    },
    handler: createScoreHandler,
  })

  server.get<{ Params: { projectId: number } }>('/:projectId', {
    handler: getScoresByProjectIdHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateScoreInput }>('/:id', {
    schema: {
      body: $ref('updateScoreSchema'),
      response: { 200: $ref('scoreResponseSchema') },
    },
    handler: updateScoreHandler,
  })

  server.delete<{ Params: { id: number } }>('/:id', {
    handler: deleteScoreHandler,
  })
}

export default scoreRoutes
