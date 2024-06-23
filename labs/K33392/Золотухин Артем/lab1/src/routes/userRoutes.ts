import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import userController from '../controllers/userController'

export default async function userRoutes(app: FastifyInstance) {
  const getUsersOpts: RouteShorthandOptions = {
    schema: {
      tags: ['users'],
      security: [{ Bearer: [] }],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
  }

  const getUserByIdOpts: RouteShorthandOptions = {
    schema: {
      tags: ['users'],
      security: [{ Bearer: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
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

  const createUserOpts: RouteShorthandOptions = {
    schema: {
      tags: ['users'],
      security: [{ Bearer: [] }],
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

  const updateUserOpts: RouteShorthandOptions = {
    schema: {
      tags: ['users'],
      security: [{ Bearer: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
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

  const deleteUserOpts: RouteShorthandOptions = {
    schema: {
      tags: ['users'],
      security: [{ Bearer: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
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

  app.get('/users', getUsersOpts, userController.getAllUsers)
  app.get('/users/:id', getUserByIdOpts, userController.getUserById)
  app.post('/users', createUserOpts, userController.createUser)
  app.put('/users/:id', updateUserOpts, userController.updateUser)
  app.delete('/users/:id', deleteUserOpts, userController.deleteUser)
}
