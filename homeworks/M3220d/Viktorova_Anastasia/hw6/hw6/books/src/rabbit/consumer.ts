import amqplib, { Channel, Connection, Message } from 'amqplib'
import BookService from '../services/book/Book'

let channel: Channel, connection: Connection
const bookService = new BookService

async function connectRabbit() {
    try {
        // const amqpServer = 'amqp://localhost:5672'
        const amqpServer = 'amqp://rabbitmq:5672'
        connection = await amqplib.connect(amqpServer)
        channel = await connection.createChannel()

        await channel.assertQueue('request')

        await channel.consume('request', async(msg: Message | null) => {
            console.log(`Сервис книг получил информацию о запросе ${Buffer.from(msg!.content)}`)
            
            const { route, body } = JSON.parse(msg!.content.toString())

            switch (route) {
                case 'create':
                    await bookService.create(body)
                    break
                default:
                    break
              }

            channel.ack(msg!);
        })
    } catch (error) {
        console.log(error)
    }
}

export default connectRabbit