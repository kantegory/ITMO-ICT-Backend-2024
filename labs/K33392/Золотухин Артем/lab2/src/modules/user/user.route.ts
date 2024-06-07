import { FastifyInstance } from 'fastify'
import { $ref } from './user.schema'
import {
  getUsersHandler,
  loginHandler,
  registerUserHandler,
} from './user.controller'

const userRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        tags: ['users'],
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    registerUserHandler
  )

  server.post(
    '/login',
    {
      schema: {
        tags: ['users'],
        body: $ref('loginSchema'),
        response: { 200: $ref('loginResponseSchema') },
      },
    },
    loginHandler
  )

  server.get(
    '/',
    {
      preHandler: [server.authenticate],
      schema: {
        tags: ['users'],
      },
    },
    getUsersHandler
  )
}

export default userRoutes
