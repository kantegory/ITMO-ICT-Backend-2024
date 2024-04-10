import { FastifyInstance } from 'fastify'
import {
  createCommentHandler,
  getCommentsByProjectIdHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from './comments.controller'
import { $ref, CreateCommentInput, UpdateCommentInput } from './comments.schema'

const commentRoutes = async (server: FastifyInstance) => {
  server.post<{ Body: CreateCommentInput }>('/', {
    schema: {
      body: $ref('createCommentSchema'),
      response: { 201: $ref('commentResponseSchema') },
    },
    handler: createCommentHandler,
  })

  server.get<{ Params: { projectId: number } }>('/:projectId', {
    handler: getCommentsByProjectIdHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateCommentInput }>('/:id', {
    schema: {
      body: $ref('updateCommentSchema'),
      response: { 200: $ref('commentResponseSchema') },
    },
    handler: updateCommentHandler,
  })

  server.delete<{ Params: { id: number } }>('/:id', {
    handler: deleteCommentHandler,
  })
}

export default commentRoutes
