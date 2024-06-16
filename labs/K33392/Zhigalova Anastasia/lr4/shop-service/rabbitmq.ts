import * as amqp from 'amqplib/callback_api';
import dotenv from "dotenv";


dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";

export function connectToRabbitMQ(retries = 5) {
  amqp.connect(RABBITMQ_URL, (err, connection) => {
    if (err) {
      console.error('Failed to connect to RabbitMQ:', err);
      if (retries > 0) {
        console.log("Retrying in 5 seconds... (${retries} retries left)");
        setTimeout(() => connectToRabbitMQ(retries - 1), 5000);
      } else {
        throw err;
      }
    } else {
      console.log('Connected to RabbitMQ');
      receiveMessage(connection);
    }
  });
}

function receiveMessage(connection: amqp.Connection) {
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    const queue = 'user_notifications';

    channel.assertQueue(queue, { durable: false });
    
    console.log("[*] Waiting for messages in ${queue}. To exit press CTRL+C");

    channel.consume(queue, (msg) => {
      if (msg) {
        console.log("[x] Received ${msg.content.toString()}");
      }
    }, { noAck: true });
  });
}
