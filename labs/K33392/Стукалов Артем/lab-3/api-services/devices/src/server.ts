import { crateBaseServer, BaseServerT } from '@repo/shared/fastify'

export const server: BaseServerT = crateBaseServer()
export type ServerT = typeof server
