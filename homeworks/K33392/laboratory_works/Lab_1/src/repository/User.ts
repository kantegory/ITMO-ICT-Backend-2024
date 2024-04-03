import { User } from '../models/User';

class UserRepository {
    // Создание пользователя
    static async createUser(name: string, email: string, password: string): Promise<User> {
        try {
            const newUser = await User.create({ name, email, password });
            return newUser;
        } catch (error) {
            throw new Error('Ошибка при создании пользователя: ' + error.message);
        }
    }

    // Получение всех пользователей
    static async getAllUsers(): Promise<User[]> {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error('Ошибка при получении всех пользователей: ' + error.message);
        }
    }

    // Получение пользователя по ID
    static async getUserById(id: number): Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw new Error('Ошибка при получении пользователя по ID: ' + error.message);
        }
    }

    // Обновление пользователя
    static async updateUser(id: number, name: string, email: string): Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            if (user) {
                await user.update({ name, email });
                return user;
            }
            return null;
        } catch (error) {
            throw new Error('Ошибка при обновлении пользователя: ' + error.message);
        }
    }

    // Удаление пользователя
    static async deleteUser(id: number): Promise<void> {
        try {
            const user = await User.findByPk(id);
            if (user) {
                await user.destroy();
            }
        } catch (error) {
            throw new Error('Ошибка при удалении пользователя: ' + error.message);
        }
    }
}

export  { UserRepository };
