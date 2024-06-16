import { UserRepository } from '../repository/User';
import { User } from '../models/User'; // Путь к модели User
import { SQLRepo } from '../config/database'; // Путь к классу SQLRepo

class UserService {
    static async createUser(name: string, email: string, password: string): Promise<User> {
        try {
            //  экземпляр SQLRepo для создания пользователя
            const newUser = await UserRepository.createUser(name, email, password);
            return newUser;
        } catch (error: any) {
            throw new Error('Ошибка создания пользователя: ' + error.message);
        }
    }

    static async getUserById(id: number): Promise<User | null> {
        try {
            // экземпляр SQLRepo для получения пользователя по ID
            const user = await UserRepository.getUserById(id);
            return user;
        } catch (error: any) {
            throw new Error('Ошибка получения пользователя по ID: ' + error.message);
        }
    }

    static async deleteUser(id: number): Promise<boolean> {
        try {
            // Используем экземпляр SQLRepo для удаления пользователя
            const deleted = await UserRepository.deleteUser(id);
            return deleted;
        } catch (error: any) {
            throw new Error('Ошибка удаления пользователя: ' + error.message);
        }
    }
}

export { UserService };
