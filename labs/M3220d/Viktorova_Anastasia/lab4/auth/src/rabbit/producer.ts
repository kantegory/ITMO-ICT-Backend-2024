import amqplib, {Connection, Channel} from 'amqplib'

let channel: Channel, connection: Connection

async function connectRabbit(data: any) {
    try {
        const amqpServer = 'amqp://guest:guest@localhost:5672'
        connection = await amqplib.connect(amqpServer)
        channel = await connection.createChannel()

        await channel.assertQueue('request')

		// отправка запроса в сервис book
		channel.sendToQueue(
			'request',
			Buffer.from(
				JSON.stringify({
					...data,
					date: new Date(),
				}),
			),
		)
    } catch (error) {
        console.log(error)
    }
}


export default connectRabbit