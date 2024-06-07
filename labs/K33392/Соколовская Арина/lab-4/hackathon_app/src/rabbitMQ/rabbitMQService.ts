import amqp, { Connection, Channel } from 'amqplib';

class RabbitMQService {
    connection!: Connection;
    channel!: Channel;

    async connect() {
        if (this.connection && this.channel) return;

        try {
            this.connection = await amqp.connect('amqp://localhost');
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.log(`Error connecting to RabbitMQ: ${error}`);
        }
    }

    async sendMessage(queue: string, message: any) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            console.log(`Error sending message to RabbitMQ: ${error}`);
        }
    }
}

const rabbitMQService = new RabbitMQService();

export default rabbitMQService;