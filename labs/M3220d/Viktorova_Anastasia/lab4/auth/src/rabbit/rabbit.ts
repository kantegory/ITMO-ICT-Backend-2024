import amqplib, {Connection, Channel} from 'amqplib'

let channel: Channel, connection: Connection

async function connectRabbit(data: any) {
    try {
        console.log("___________________________in rabbit___________")
        const amqpServer = 'amqp://guest:guest@localhost:5672'
        connection = await amqplib.connect(amqpServer)
        channel = await connection.createChannel()

        // если очередь не создана, она создастся автоматически
        await channel.assertQueue('request')
        await channel.assertQueue('response')

		// отправка запроса в сервис склада
		channel.sendToQueue(
			'request',
			Buffer.from(
				JSON.stringify({
					...data,
					date: new Date(),
				}),
			),
		)


        var res 
        // слушаем все сообщения из очереди cart
        await new Promise(resolve => channel.consume('response', (data) => {
            console.log(`Сервис auth получил информацию о запросе ${Buffer.from(data!.content)}`)

            res = JSON.parse(data!.content.toString())
            console.log("in in rabbit ",res)
            channel.ack(data!);
            channel.close()
        }));
        // await channel.consume('response', (data) => {
        //     console.log(`Сервис auth получил информацию о запросе ${Buffer.from(data!.content)}`)

        //     res = JSON.parse(data!.content.toString())
        //     console.log("in in rabbit ",res)
        //     channel.ack(data!);
        // })
        console.log("in rabbit ",res)
        return res
    } catch (error) {
        console.log(error)
    }
}


export default connectRabbit