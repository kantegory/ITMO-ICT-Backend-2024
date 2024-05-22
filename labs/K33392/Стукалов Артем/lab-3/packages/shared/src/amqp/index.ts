import amqp, { Channel } from 'amqplib'

const rabbitUrl = 'amqp://rabbitmq:5672'

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export async function getRabbitChannel(): Promise<Channel> {
  try {
    await delay(20 * 1000)
    const conn = await amqp.connect(rabbitUrl)
    return conn.createChannel()
  } catch (error: any) {
    console.error(error.message || error)
    throw error
  }
}
