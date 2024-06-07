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
      tags: ['comments'],
      body: $ref('createCommentSchema'),
      response: { 201: $ref('commentResponseSchema') },
    },
    handler: createCommentHandler,
  })

  server.get<{ Params: { projectId: number } }>('/:projectId', {
    schema: {
      tags: ['comments'],
    },
    handler: getCommentsByProjectIdHandler,
  })

  server.put<{ Params: { id: number }; Body: UpdateCommentInput }>('/:id', {
    schema: {
      tags: ['comments'],
      body: $ref('updateCommentSchema'),
      response: { 200: $ref('commentResponseSchema') },
    },
    handler: updateCommentHandler,
  })

  server.delete<{ Params: { id: number } }>('/:id', {
    schema: {
      tags: ['comments'],
    },
    handler: deleteCommentHandler,
  })
}

export default commentRoutes
