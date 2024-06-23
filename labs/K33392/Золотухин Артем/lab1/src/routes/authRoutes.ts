import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import authController from '../controllers/authController'

export default async function authRoutes(app: FastifyInstance) {
  const loginOpts: RouteShorthandOptions = {
    schema: {
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
  }

  const registerOpts: RouteShorthandOptions = {
    schema: {
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  }

  app.post('/login', loginOpts, authController.login)
  app.post('/register', registerOpts, authController.register)
}
