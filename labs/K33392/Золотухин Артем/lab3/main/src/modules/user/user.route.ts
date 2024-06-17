import { FastifyInstance } from 'fastify'
import { $ref } from '../../../../auth-service/user/user.schema'

async function userRoutes(server: FastifyInstance) {
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
    async (request, reply) => {
      const response = await server.sendToAuthQueue({
        type: 'register',
        payload: request.body,
      })
      reply.code(response.status).send(response.response)
    }
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
    async (request, reply) => {
      const response = await server.sendToAuthQueue({
        type: 'login',
        payload: request.body,
      })
      reply.code(response.status).send(response.response)
    }
  )

  server.get(
    '/',
    {
      preHandler: [server.authenticate],
      schema: {
        tags: ['users'],
      },
    },
    async () => {
      // Example user retrieval logic, if needed
    }
  )
}

export default userRoutes
