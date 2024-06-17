import amqp from "amqplib";
import auth  from './auth';
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import UserService from "../service/users"

const rabbitUrl = "amqp://rabbitmq:5672"; 
const queueName = "auth_queue"; 

async function start() {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
      if (msg!== null) {
        try {
          const SECRET_KEY: Secret = "TEST_MARKET_FOR_LESSON";
          const userService = new UserService();

          const message = JSON.parse(msg.content.toString());
          const token = message.token;

          const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

          const userData = await userService.getIdWithPassword(decoded.id);

          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(userData)));
        } catch (err) {
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ error: 'Authentication failed' })));
        }
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

start();