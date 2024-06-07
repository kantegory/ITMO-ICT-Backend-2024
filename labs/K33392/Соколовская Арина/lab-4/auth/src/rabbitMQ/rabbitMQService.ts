import amqp, { Connection, Channel } from 'amqplib';

class RabbitMQService {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    async connect(): Promise<void> {
        if (this.connection && this.channel) return;

        try {
            this.connection = await amqp.connect('amqp://localhost');
            this.channel = await this.connection.createChannel();
        } catch (err) {
            console.log(err);
        }
    }

    async consumeMessage(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized');
        }

        await this.channel.consume(queue, callback, { noAck: true });
    }

    async createQueue(queue: string): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized');
        }

        await this.channel.assertQueue(queue);
    }
}

const mqConnection = new RabbitMQService();
export default mqConnection;
