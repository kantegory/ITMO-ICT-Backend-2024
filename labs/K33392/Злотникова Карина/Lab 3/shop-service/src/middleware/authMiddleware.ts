
import { Request, Response, NextFunction } from 'express';
import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import jwt from 'jsonwebtoken';

interface User {
    id: number;
    username: string;
}

const jwtSecret = 'super_secret_key';
let amqpChannel: Channel;

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
                return res.status(403).json({ message: 'Invalid token' });
        }

        const decoded: any = jwt.verify(token, jwtSecret);

        const userId = decoded.userId;

        const connection: Connection = await amqp.connect('amqp://localhost');
        amqpChannel = await connection.createChannel();
        const queue = 'auth_queue';

        await amqpChannel.assertQueue(queue, { durable: false });

        let user: User | null = null;

        await amqpChannel.consume(queue, (msg: ConsumeMessage | null) => {
            if (msg !== null) {
                user = JSON.parse(msg.content.toString());
                amqpChannel.ack(msg);
            }
        });

        await sendUserId(userId);
        await amqpChannel.close();
        await connection.close();

        setTimeout(() => {
            if (user) {
                req.body.user = user;
                next();
            } else {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }, 500);

    } catch (error) {
        return res.status(403).json({ message: error });
    }
};

const sendUserId = async (userId: number) => {
    if (!amqpChannel) return;
    const queue = 'auth_queue';
    amqpChannel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId })));
};

export default authenticate;