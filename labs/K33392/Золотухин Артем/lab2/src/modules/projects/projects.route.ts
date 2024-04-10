// project.route.ts
import { FastifyInstance } from 'fastify'
import {
  createProjectHandler,
  getAllProjectsHandler,
  getProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from './projects.controller'
import { $ref, CreateProjectInput, UpdateProjectInput } from './projects.schema'

const projectRoutes = async (server: FastifyInstance) => {
  server.post<{ Body: CreateProjectInput }>('/', {
    schema: {
      body: $ref('createProjectSchema'),
      response: { 201: $ref('projectResponseSchema') },
    },
    handler: createProjectHandler,
  })

  server.get('/', {
    handler: getAllProjectsHandler,
  })

  server.get('/:id', {
    handler: getProjectHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateProjectInput }>('/:id', {
    schema: {
      body: $ref('updateProjectSchema'),
      response: { 200: $ref('projectResponseSchema') },
    },
    handler: updateProjectHandler,
  })

  server.delete('/:id', {
    handler: deleteProjectHandler,
  })
}

export default projectRoutes
