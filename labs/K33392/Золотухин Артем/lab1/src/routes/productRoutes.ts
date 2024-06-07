import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import productController from '../controllers/productController'

const productRoutes = async (app: FastifyInstance) => {
  const getProductOpts: RouteShorthandOptions = {
    schema: {
      tags: ['products'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  }

  const getProductByIdOpts: RouteShorthandOptions = {
    schema: {
      tags: ['products'],
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
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  }

  const createProductOpts: RouteShorthandOptions = {
    schema: {
      tags: ['products'],
      body: {
        type: 'object',
        required: ['name', 'description', 'price'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    preHandler: [app.authenticate],
  }

  const updateProductOpts: RouteShorthandOptions = {
    schema: {
      tags: ['products'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    preHandler: [app.authenticate],
  }

  const deleteProductOpts: RouteShorthandOptions = {
    schema: {
      tags: ['products'],
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
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    preHandler: [app.authenticate],
  }

  app.get('/products', getProductOpts, productController.getAllProducts)
  app.get('/products/:id', getProductByIdOpts, productController.getProductById)
  app.post('/products', createProductOpts, productController.createProduct)
  app.put('/products/:id', updateProductOpts, productController.updateProduct)
  app.delete(
    '/products/:id',
    deleteProductOpts,
    productController.deleteProduct
  )
}

export default productRoutes
