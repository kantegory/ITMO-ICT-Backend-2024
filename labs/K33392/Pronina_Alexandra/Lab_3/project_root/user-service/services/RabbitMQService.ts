import amqp from 'amqplib/callback_api';

export class RabbitMQService {
    private static channel: amqp.Channel;

    static connect() {
        amqp.connect('amqp://rabbitmq', (error0, connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }
                RabbitMQService.channel = channel;
            });
        });
    }

    static sendMessage(queue: string, message: string) {
        RabbitMQService.channel.assertQueue(queue, { durable: false });
        RabbitMQService.channel.sendToQueue(queue, Buffer.from(message));
    }
}
