import { pino } from 'pino'
import PinoPretty from 'pino-pretty'

export const logger = pino(
  PinoPretty({
    translateTime: 'HH:MM:ss Z',
    ignore: 'pid,hostname',
    minimumLevel: 'trace',
  }),
)
