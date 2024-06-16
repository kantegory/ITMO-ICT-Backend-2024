import rabbitMQService from './rabbitMQService';
import amqp from 'amqplib';
import { UserService } from '../service/user';

const userService = new UserService();

async function handleParticipantMessage(msg: amqp.ConsumeMessage | null): Promise<void> {
    if (msg === null) {
        console.log("Received null message");
        return;
    }

    const user_id = (JSON.parse(msg.content.toString())).user_id;
    console.log(user_id.user_id);
    let user = await userService.findById(user_id);
    user.if_participating = true;
    await userService.patch(user);
}

export const startConsumer = async () => {
    try {
        await rabbitMQService.connect();
        await rabbitMQService.createQueue('participation_queue');
        await rabbitMQService.consumeMessage('participation_queue', handleParticipantMessage);
    } catch (error) {
        console.error(error);
    }
};
