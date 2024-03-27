import dotenv from 'dotenv'

dotenv.config()
export type EnvT = 'development' | 'production'
export const ENV_TYPE: EnvT =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
export const IS_DEV = ENV_TYPE === 'development'
export const LISTEN_PORT = Number(process.env.LISTEN_PORT) || 3000
export const LISTEN_HOST = process.env.LISTEN_HOST || 'localhost'
