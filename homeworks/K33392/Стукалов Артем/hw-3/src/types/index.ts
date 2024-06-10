import { ServerT } from 'config/server'

import {
  ContextConfigDefault,
  FastifyInstance,
  FastifySchema,
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify'

export type ControllerHandler<Schema extends FastifySchema> =
  ServerT extends FastifyInstance<
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
