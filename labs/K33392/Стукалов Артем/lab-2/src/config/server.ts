import { AUTH_SECRET } from 'config/env'
import { logger } from 'config/logger'

import fjwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

const app = Fastify({
  logger,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fjwt, {
  secret: AUTH_SECRET,
})

app.decorate(
  'authenticate',
  async function (req: FastifyRequest, res: FastifyReply) {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.send(err)
    }
  },
)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Template API',
      description: '',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

export const server = app.withTypeProvider<ZodTypeProvider>()
export type ServerT = typeof server
