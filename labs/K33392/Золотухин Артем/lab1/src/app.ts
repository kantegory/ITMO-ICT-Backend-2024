import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import userRoutes from './modules/user/user.route'
import { userSchemas } from './modules/user/user.schema'
import { productSchemas } from './modules/product/product.schema'
import productRoutes from './modules/product/product.route'
import { version } from '../package.json'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

export const app = Fastify()
export const server = app.withTypeProvider<ZodTypeProvider>()

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
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (e) {
      return reply.send(e)
    }
  }
)

app.get('/healtcheck', async () => {
  return {
    status: 'OK',
  }
})

async function main() {
  for (const schema of [...userSchemas, ...productSchemas]) {
    app.addSchema(schema)
  }

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(swagger, {
    openapi: {
      info: {
        title: 'Template API',
        description: '',
        version: version,
      },
      servers: [],
    },
  })

  app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })

  app.register(userRoutes, { prefix: 'api/users' })
  app.register(productRoutes, { prefix: 'api/products' })

  try {
    await app.listen(3000, '0.0.0.0')
    console.log('Server running on 3000')
  } catch (e) {
    console.log(`Server error ${e}`)
    process.exit(1)
  }
}

main()
