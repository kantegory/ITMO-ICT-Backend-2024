import Fastify from 'fastify'
import fjwt from '@fastify/jwt'
import amqp from 'amqplib'
import { PrismaClient } from '@prisma/client'
import { registerUserHandler, loginHandler } from './user/user.controller'
import { userSchemas } from './user/user.schema'
import 'dotenv/config'

export const app = Fastify()
const prisma = new PrismaClient()

app.register(fjwt, {
  secret: 'asdldaskjdasklnvsnv1212lasdkldasf121adfdfjkl123',
})

app.addHook('onClose', async () => {
  await prisma.$disconnect()
})

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue('auth_queue')

  channel.consume('auth_queue', async (msg) => {
    if (msg !== null) {
      const { type, payload } = JSON.parse(msg.content.toString())

      if (type === 'register') {
        const reply = {
          code: (status: any) => ({
            send: (response: any) => {
              channel.sendToQueue(
                msg.properties.replyTo,
                Buffer.from(JSON.stringify({ status, response })),
                {
                  correlationId: msg.properties.correlationId,
                }
              )
            },
          }),
        }
        await registerUserHandler({ body: payload } as any, reply as any)
      } else if (type === 'login') {
        const reply = {
          code: (status: any) => ({
            send: (response: any) => {
              channel.sendToQueue(
                msg.properties.replyTo,
                Buffer.from(JSON.stringify({ status, response })),
                {
                  correlationId: msg.properties.correlationId,
                }
              )
            },
          }),
        }
        await loginHandler({ body: payload } as any, reply as any)
      }
      channel.ack(msg)
    }
  })
}

app.get('/healthcheck', async () => {
  return {
    status: 'OK',
  }
})

async function main() {
  await connectRabbitMQ()

  for (const schema of userSchemas) {
    app.addSchema(schema)
  }

  try {
    await app.listen({ port: 3001, host: '0.0.0.0' })
    console.log('Auth service running on port 3001')
  } catch (e) {
    app.log.error(e)
    process.exit(1)
  }
}

main()
