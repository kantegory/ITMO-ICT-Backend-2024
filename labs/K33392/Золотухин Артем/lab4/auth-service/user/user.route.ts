import { FastifyInstance } from 'fastify'
import { registerUserHandler, loginHandler } from './user.controller'
import { $ref } from './user.schema'

const userRoutes = async (server: FastifyInstance) => {
  server.post(
    '/register',
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
}

export default userRoutes
