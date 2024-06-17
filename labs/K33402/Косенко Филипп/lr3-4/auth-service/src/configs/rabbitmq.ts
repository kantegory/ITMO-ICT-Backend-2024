import amqp from 'amqplib/callback_api';
import dotenv from 'dotenv';

dotenv.config();

const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';

amqp.connect(`amqp://${rabbitmqHost}`, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = 'authorize';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from('готово'));
  });
});