import { Request, Response } from 'express'
import amqp, { Connection, Channel } from 'amqplib/callback_api.js'

export const logsMiddleware = (req: Request, res: Response, next) => {
  res.on('finish', () => {
    amqp.connect(
      'amqp://rabbitmq',
      function (error0: Error, connection: Connection) {
        if (error0) {
          throw error0
        }
        connection.createChannel(function (error1: Error, channel: Channel) {
          if (error1) {
            throw error1
          }

          const queue = 'logs_queue'
          var msg = JSON.stringify({
            code: res.statusCode,
            path: req.path,
            method: req.method,
          })

          channel.assertQueue(queue, {
            durable: false,
          })
          channel.sendToQueue(queue, Buffer.from(msg))

          console.log(' [x] Sent %s', msg)
        })
      }
    )
  })
  next()
}

