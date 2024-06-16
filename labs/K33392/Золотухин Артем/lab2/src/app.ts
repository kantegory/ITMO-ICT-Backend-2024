import Fastify from 'fastify'
import fjwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import userRoutes from './modules/user/user.route'
import { userSchemas } from './modules/user/user.schema'
import { version } from '../package.json'
import { buildJsonSchemas } from 'fastify-zod'
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

export const app = Fastify()

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any
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

app.register(fjwt, {
  secret: 'asdldaskjdasklnvsnv1212lasdkldasf121adfdfjkl123',
})

app.decorate(
  'authenticate',
  async (
    request: { jwtVerify: () => any },
    reply: { send: (arg0: unknown) => any }
  ) => {
    try {
      await request.jwtVerify()
    } catch (e) {
      return reply.send(e)
    }
  }
)

app.get('/healthcheck', async () => {
  return {
    status: 'OK',
  }
})

async function main() {
  for (const schema of [
    ...userSchemas,
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

  app.register(userRoutes, { prefix: 'api/users' })
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
