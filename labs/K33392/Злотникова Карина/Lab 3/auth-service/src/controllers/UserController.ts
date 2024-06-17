import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import amqp from 'amqplib';
import { User } from '../entities/User';

class UserController {

    static async signUp(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const hashedPassword = await bcrypt.hash(req.body.password, 8);
            const newUser = userRepository.create({ username: req.body.username, password: hashedPassword });
            await userRepository.save(newUser);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async signIn(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ where: { username: req.body.username } });
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ userId: user.id },'super_secret_key', { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static verifyToken(token: string) {
        try {
            return jwt.verify(token,'super_secret_key');
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    static async sendUserData(userId: number) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) throw new Error('User not found');

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'auth_queue';

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));

        setTimeout(() => {
            connection.close();
        }, 500);
    }
}

export default UserController;