import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import amqp from 'amqplib';

class AuthService {
    private static secret = "not_super_secret_token";

    static async register(username: string, password: string) {
        const userRepository = getRepository(User);
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = userRepository.create({ username, password: hashedPassword });
        await userRepository.save(user);
        return user;
    }

    static async login(username: string, password: string) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ userId: user.id }, this.secret, { expiresIn: '1h' });
        return { token };
    }

    static verifyToken(token: string) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    static async sendUserDetails(userId: number) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: { id: userId }});
        if (!user) throw new Error('User not found');

        const connection = await amqp.connect('amqp://rabbitmq:5672');
        const channel = await connection.createChannel();
        const queue = 'auth_queue';

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));

        setTimeout(() => {
            connection.close();
        }, 500);
    }
}

export default AuthService;