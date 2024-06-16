import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any
  }
  interface FastifyRequest {
    user: {
      id: number
    }
  }
}

const app = fastify({ logger: true })

app.register(require('@fastify/jwt'), {
  secret: 'your_jwt_secret',
})

app.decorate(
  'authenticate',
  async (
    request: { jwtVerify: () => any },
    reply: { send: (arg0: unknown) => void }
  ) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  }
)

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'API documentation for Fastify application',
      version: '0.1.0',
    },
    tags: [
      { name: 'auth', description: 'Authentication related end-points' },
      { name: 'users', description: 'User related end-points' },
      { name: 'products', description: 'Product related end-points' },
    ],
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ Bearer: [] }],
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
})

app.register(authRoutes, { prefix: '/api' })
app.register(userRoutes, { prefix: '/api', preHandler: [app.authenticate] })
app.register(productRoutes, { prefix: '/api' })

export default app
