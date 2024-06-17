import { FastifyRequest, FastifyReply } from 'fastify'
import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

interface User {
  id: number
  email: string
  name: string
}

const secret = 'asdldaskjdasklnvsnv1212lasdkldasf121adfdfjkl123'

let connection: Connection
let channel: Channel

const connectRabbitMQ = async () => {
  connection = await amqp.connect('amqp://localhost')
  channel = await connection.createChannel()
  await channel.assertQueue('auth_queue')
}

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!connection || !channel) {
      await connectRabbitMQ()
    }

    const authHeader = request.headers.authorization
    if (!authHeader) {
      return reply.status(403).send({ message: 'No token provided' })
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer' || !token) {
      return reply.status(403).send({ message: 'Invalid token' })
    }

    const decoded: any = jwt.verify(token, secret)
    const userId = decoded.id

    let user: User | null = null

    const correlationId = uuidv4()
    const replyQueue = await channel.assertQueue('', { exclusive: true })

    channel.consume(
      replyQueue.queue,
      (msg: ConsumeMessage | null) => {
        if (msg && msg.properties.correlationId === correlationId) {
          user = JSON.parse(msg.content.toString())
          channel.ack(msg)
        }
      },
      { noAck: true }
    )

    await sendUserId(userId, correlationId, replyQueue.queue)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (user) {
      request.user = user
      return
    } else {
      return reply.status(403).send({ message: 'Invalid token' })
    }
  } catch (error) {
    return reply.status(403).send({ message: 'Invalid token' })
  }
}

const sendUserId = async (
  userId: number,
  correlationId: string,
  replyTo: string
) => {
  if (!channel) return
  const queue = 'auth_queue'
  channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId })), {
    correlationId,
    replyTo,
  })
}

export default authMiddleware
