import amqplib, { Channel, Connection, Message } from 'amqplib'
import BookService from '../services/book/Book'

let channel: Channel, connection: Connection
const bookService = new BookService

async function connectRabbit() {
    try {
        const amqpServer = 'amqp://localhost:5672'
        connection = await amqplib.connect(amqpServer)
        channel = await connection.createChannel()

        // если очередь не создана, она создастся автоматически
        await channel.assertQueue('request')
        await channel.assertQueue('response')

        // слушаем все сообщения из очереди cart
        await channel.consume('request', async(msg: Message | null) => {
            console.log(`Сервис книг получил информацию о запросе ${Buffer.from(msg!.content)}`)
            
            const { route, payload } = JSON.parse(msg!.content.toString())
            console.log(route, payload)

            var data = {
            }
            switch (route) {
                case 'get_all':
                    const d = await bookService.getAll()
                    console.log(d)
                    data = {
                        payload: d
                    }
                    break
                default:
                    break
              }

            channel.sendToQueue(
                'response',
                Buffer.from(
                    JSON.stringify({
                        data,
                        date: new Date(),
                    }),
                ),
            )

            channel.ack(msg!);
        })
    } catch (error) {
        console.log(error)
    }
}

export default connectRabbit