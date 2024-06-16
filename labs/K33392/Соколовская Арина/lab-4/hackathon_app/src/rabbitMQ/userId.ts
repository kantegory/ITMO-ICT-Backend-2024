// import { rabbitMQService } from './rabbitMQService';

// function generateUuid() {
//     return Math.random().toString() + Math.random().toString() + Math.random().toString();
//   }

// async function getUserId(token: string): Promise<Number> {
//   await rabbitMQService.connect();
//   const correlationId = generateUuid();
//   const responseQueue = 'amq.rabbitmq.reply-to';

//   const result = new Promise<string>((resolve, reject) => {
//     rabbitMQService.consumeMessage(responseQueue, (msg) => {
//       if (msg?.properties.correlationId === correlationId) {
//         resolve(msg.content.toString());
//       }
//     });

//     rabbitMQService.sendMessage('get_user_id_queue', JSON.stringify({ token, responseQueue, correlationId }));
//   });
// //   await rabbitMQService.sendMessage('get_user_role_queue', token);
// //   await rabbitMQService.close();

//   return Number(result);
// }

// export default getUserId;