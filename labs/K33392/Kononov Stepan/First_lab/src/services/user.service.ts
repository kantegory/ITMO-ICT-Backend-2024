import {getConnectionManager, getRepository} from 'typeorm';
import { User } from '../models/user.entity';

export class UserService {

    async findAll(): Promise<User[]> {
        const userRepository = getRepository(User);
        return userRepository.find();
    }

    async create(user: User): Promise<User> {
        const userRepository = getRepository(User);
        return userRepository.save(user);
    }

    async update(id: number, user: Partial<User>): Promise<void> {
        const userRepository = getRepository(User);
        await userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        const userRepository = getRepository(User);
        await userRepository.delete(id);
    }
}
