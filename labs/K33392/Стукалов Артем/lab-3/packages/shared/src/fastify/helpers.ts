import { BaseServerT } from './index'
import { JWT } from '@fastify/jwt'
import {
  ContextConfigDefault,
  FastifyInstance,
  FastifySchema,
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify'

export type ControllerHandler<Schema extends FastifySchema> =
  BaseServerT extends FastifyInstance<
    infer RawServer,
    infer RawRequest,
    infer RawReply,
    infer Logger,
    infer TypeProvider
  >
    ? RouteHandlerMethod<
        RawServer,
        RawRequest,
        RawReply,
        RouteGenericInterface,
        ContextConfigDefault,
        Schema,
        TypeProvider,
        Logger
      >
    : never

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    // eslint-disable-next-line no-unused-vars
    authenticate: (req: FastifyRequest, res: FastifyReply) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number
    }
  }
}
