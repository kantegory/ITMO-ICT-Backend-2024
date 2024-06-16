// import rabbitMQService from './rabbitMQService';
// import amqp, { Connection, Channel } from 'amqplib';
// import jwt from "jsonwebtoken";
// import { User } from "../model/user";

// const userController = require("../controller/user"); 

// async function handleGetUserRoleMessage(msg: amqp.ConsumeMessage | null): Promise<void> {
//     if (msg === null) {
//         console.log("Received null message");
//         return;
//     }

//     const { token, correlationId } = JSON.parse(msg.content.toString());

//     const parsed = jwt.verify(token, process.env.secret_key as string);
//     console.log(parsed);
//     const user_role = (parsed as User).role_name;

//     await rabbitMQService.sendMessage('response_queue', JSON.stringify({ user_role }), {
//         correlationId,
//     });
// }

// export const startConsumer = async () => {
//     try {
//         await rabbitMQService.connect();
//         await rabbitMQService.consumeMessage('response_user_role_queue', handleGetUserRoleMessage);
//     } catch (error) {
//         console.error(error);
//     }
// };
