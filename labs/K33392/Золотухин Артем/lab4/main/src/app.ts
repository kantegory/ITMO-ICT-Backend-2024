import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import fjwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { version } from '../package.json'
import hackathonRoutes from './modules/hackathons/hackathons.route'
import { hackathonSchemas } from './modules/hackathons/hackathons.schema'
import { projectSchemas } from './modules/projects/projects.schema'
import projectRoutes from './modules/projects/projects.route'
import { teamSchemas } from './modules/teams/teams.schema'
import teamRoutes from './modules/teams/teams.route'
import { scoreSchemas } from './modules/scores/scores.schema'
import scoreRoutes from './modules/scores/scores.route'
import { commentSchemas } from './modules/comments/comments.schema'
import commentRoutes from './modules/comments/comments.route'
import authMiddleware from './middleware/authMiddleware'
import amqp, { Connection, Channel } from 'amqplib'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
export const app = Fastify()

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any
    sendToAuthQueue: (message: any) => Promise<any>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number
      email: string
      name: string
    }
  }
}

let connection: Connection
let channel: Channel

async function connectRabbitMQ() {
  await new Promise((resolve) => setTimeout(resolve, 20000))
  connection = await amqp.connect('amqp://rabbitmq:5672')
  channel = await connection.createChannel()
  await channel.assertQueue('auth_queue')

  app.decorate('sendToAuthQueue', async (message) => {
    const correlationId = uuidv4()
    const replyQueue = await channel.assertQueue('', { exclusive: true })

    return new Promise((resolve, reject) => {
      channel.consume(
        replyQueue.queue,
        (msg) => {
          if (!msg) return
          if (msg.properties.correlationId === correlationId) {
            resolve(JSON.parse(msg.content.toString()))
          }
        },
        { noAck: true }
      )

      channel.sendToQueue('auth_queue', Buffer.from(JSON.stringify(message)), {
        correlationId,
        replyTo: replyQueue.queue,
      })
    })
  })
}

app.register(fjwt, {
  secret: 'asdldaskjdasklnvsnv1212lasdkldasf121adfdfjkl123',
})

app.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    await authMiddleware(request, reply)
  }
)

app.get('/healthcheck', async () => {
  return {
    status: 'OK',
  }
})

async function main() {
  await connectRabbitMQ()

  for (const schema of [
    ...hackathonSchemas,
    ...projectSchemas,
    ...teamSchemas,
    ...scoreSchemas,
    ...commentSchemas,
  ]) {
    app.addSchema(schema)
  }

  app.register(swagger, {
    openapi: {
      info: {
        title: 'Template API',
        description: '',
        version: version,
      },
      tags: [
        { name: 'users', description: 'User related end-points' },
        { name: 'hackathons', description: 'Hackathon related end-points' },
        { name: 'projects', description: 'Project related end-points' },
        { name: 'teams', description: 'Team related end-points' },
        { name: 'scores', description: 'Score related end-points' },
        { name: 'comments', description: 'Comment related end-points' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  })

  app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => swaggerObject,
    transformSpecificationClone: true,
  })

  app.register(hackathonRoutes, { prefix: 'api/hackathons' })
  app.register(projectRoutes, { prefix: 'api/projects' })
  app.register(teamRoutes, { prefix: 'api/teams' })
  app.register(scoreRoutes, { prefix: 'api/scores' })
  app.register(commentRoutes, { prefix: 'api/comments' })

  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Server running on 3000')
  } catch (e) {
    console.log(`Server error ${e}`)
    process.exit(1)
  }
}

main()
