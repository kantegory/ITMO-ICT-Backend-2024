// team.route.ts
import { FastifyInstance } from 'fastify'
import {
  createTeamHandler,
  getAllTeamsHandler,
  getTeamHandler,
  updateTeamHandler,
  deleteTeamHandler,
} from './teams.controller'
import { $ref, CreateTeamInput, UpdateTeamInput } from './teams.schema'

const teamRoutes = async (server: FastifyInstance) => {
  server.post<{ Body: CreateTeamInput }>('/', {
    schema: {
      body: $ref('createTeamSchema'),
      response: { 201: $ref('teamResponseSchema') },
    },
    handler: createTeamHandler,
  })

  server.get('/', {
    handler: getAllTeamsHandler,
  })

  server.get<{ Params: { id: number } }>('/:id', {
    handler: getTeamHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateTeamInput }>('/:id', {
    schema: {
      body: $ref('updateTeamSchema'),
      response: { 200: $ref('teamResponseSchema') },
    },
    handler: updateTeamHandler,
  })

  server.delete<{ Params: { id: number } }>('/:id', {
    handler: deleteTeamHandler,
  })
}

export default teamRoutes
