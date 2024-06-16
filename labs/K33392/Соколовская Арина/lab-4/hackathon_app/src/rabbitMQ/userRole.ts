// import rabbitMQService from './rabbitMQService';
// import { v4 as uuid } from 'uuid';

// export async function getUserRole(token: string): Promise<string> {
//     const correlationId: string = uuid();
//     console.log(correlationId, token);

//     await rabbitMQService.connect();

//     const result = await new Promise<string>((resolve, reject) => {
//         const responseHandler = (msg: any) => {
//             if (msg) {
//                 console.log(`received ${msg.properties.correlationId}`);
//                 console.log(`required ${correlationId} ${token}`);
//                 if (msg.properties.correlationId === correlationId) {
//                     // rabbitMQService.removeListener('response_user_role_queue', responseHandler);
//                     const { user_role } = JSON.parse(msg.content.toString());
//                     resolve(user_role);
//                 }
//             }
//         };

//         rabbitMQService.consumeMessage('response_queue', responseHandler);

//         rabbitMQService.sendMessage('get_user_role_queue', JSON.stringify({ token, correlationId }));
//     });

//     return result;
// }
