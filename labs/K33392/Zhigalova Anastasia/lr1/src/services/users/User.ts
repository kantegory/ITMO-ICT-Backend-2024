import { User } from '../../models/users/User.js'

export class UserRepository {
    async create(userData: any): Promise<User> {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
            throw new Error("Не удалось создать пользователя: " + error.message);
        }
    }
    

    async get(): Promise<User[]> {
        try {
            const users = await User.findAll()
            return users
        } catch (error) {
            console.error(error)
            throw new Error("Ошибка при получении списка пользователей: " + error.message)
        }
    }
}
    
