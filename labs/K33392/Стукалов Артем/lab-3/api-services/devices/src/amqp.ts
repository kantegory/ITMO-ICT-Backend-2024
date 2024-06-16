import { getRabbitChannel } from '@repo/shared/amqp'
import { Channel } from 'amqplib'

let amqpChannel: Channel | undefined

export async function setUpAMQPChannel() {
  const res = await getRabbitChannel()
  amqpChannel = res
}

type ChannelData = {
  kind: 'CreateTestArea'
  userId: number
}

export async function publishMessage(data: ChannelData) {
  if (!amqpChannel) {
    return
  }

  await amqpChannel.assertQueue('all_queue', {})

  const msg = JSON.stringify(data)
  amqpChannel.publish('', 'all_queue', Buffer.from(msg))
}

export async function subscribeForMessages(
  handler: (data: ChannelData) => Promise<void>
) {
  if (!amqpChannel) {
    return
  }

  await amqpChannel.assertQueue('all_queue', {})

  amqpChannel.consume('all_queue', async (msg) => {
    if (!msg) {
      return
    }

    const data = JSON.parse(msg.content.toString())
    await handler(data)
  })
}
