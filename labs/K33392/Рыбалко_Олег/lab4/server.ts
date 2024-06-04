import amqp, { Connection, Channel, Message } from 'amqplib/callback_api.js'
import sqlite3 from 'sqlite3'

const sqlite = sqlite3.verbose()
const db = new sqlite.Database('logs.db')

interface Log {
  path: string
  code: number
}

db.exec(
  `CREATE TABLE IF NOT EXISTS logs (id integer primary key autoincrement, path text, code integer);`
)
amqp.connect(
  'amqp://localhost',
  function (error0: Error, connection: Connection) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1: Error, channel: Channel) {
      if (error1) {
        throw error1
      }

      const queue = 'logs_queue'

      channel.assertQueue(queue, {
        durable: false,
      })

      console.log('[*] Waiting for messages in %s. To exit press CTRL+C', queue)

      channel.consume(
        queue,
        function (msg: Message) {
          const log = JSON.parse(msg.content.toString()) as Log
          db.run(
            `INSERT INTO logs (path, code) VALUES (?, ?)`,
            [log.path, log.code],
            function (error: Error) {
              if (error) {
                console.log('Failed to save a log: %s', error)
              }
            }
          )
        },
        {
          noAck: true,
        }
      )
    })
  }
)

