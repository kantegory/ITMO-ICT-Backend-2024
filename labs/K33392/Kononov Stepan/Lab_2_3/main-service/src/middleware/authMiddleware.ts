import { Request, Response, NextFunction } from 'express';
import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import jwt from 'jsonwebtoken';

interface User {
    id: number;
    username: string;
}

const secret = 'not_super_secret_token';
let channel: Channel;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const decoded: any = jwt.verify(token, secret);

        const userId = decoded.userId;

        const connection: Connection = await amqp.connect('amqp://rabbitmq:5672');
        channel = await connection.createChannel();
        const queue = 'auth_queue';

        await channel.assertQueue(queue, { durable: false });

        let user: User | null = null;

        await channel.consume(queue, (msg: ConsumeMessage | null) => {
            if (msg !== null) {
                user = JSON.parse(msg.content.toString());
                channel.ack(msg);
            }
        });

        await sendUserId(userId);
        await channel.close()
        await connection.close()

        setTimeout(() => {
            if (user) {
                req.body.user = user;
                next();
            } else {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }, 500);

    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

const sendUserId = async (userId: number) => {
    if (!channel) return;
    const queue = 'auth_queue';
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({userId})));
};

export default authMiddleware;