import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fjwt from '@fastify/jwt'
import { logger } from './logger'

export * from './logger'
export * from './helpers'

export function crateBaseServer() {
  const app = Fastify({
    logger,
  })

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fjwt, {
    secret: 'SECRET',
  })

  app.decorate(
    'authenticate',
    async function (req: FastifyRequest, res: FastifyReply) {
      try {
        await req.jwtVerify()
      } catch (err) {
        res.send(err)
      }
    }
  )

  return app.withTypeProvider<ZodTypeProvider>()
}

export type BaseServerT = ReturnType<typeof crateBaseServer>
