import UserRepository from '../repository/User';
import { User } from '../models/User';

class UserService {
    // Создание пользователя
    static async createUser(name: string, email: string, password: string): Promise<User> {
        try {
            const newUser = await UserRepository.createUser(name, email, password);
            return newUser;
        } catch (error) {
            throw new Error('Ошибка при создании пользователя: ' + error.message);
        }
    }

    // Получение всех пользователей
    static async getAllUsers(): Promise<User[]> {
        try {
            const users = await UserRepository.getAllUsers();
            return users;
        } catch (error) {
            throw new Error('Ошибка при получении всех пользователей: ' + error.message);
        }
    }

    // Получение пользователя по ID
    static async getUserById(id: number): Promise<User | null> {
        try {
            const user = await UserRepository.getUserById(id);
            return user;
        } catch (error) {
            throw new Error('Ошибка при получении пользователя по ID: ' + error.message);
        }
    }

    // Обновление пользователя
    static async updateUser(id: number, name: string, email: string): Promise<User | null> {
        try {
            const updatedUser = await UserRepository.updateUser(id, name, email);
            return updatedUser;
        } catch (error) {
            throw new Error('Ошибка при обновлении пользователя: ' + error.message);
        }
    }

    // Удаление пользователя
    static async deleteUser(id: number): Promise<void> {
        try {
            await UserRepository.deleteUser(id);
        } catch (error) {
            throw new Error('Ошибка при удалении пользователя: ' + error.message);
        }
    }
}

export default UserService;
