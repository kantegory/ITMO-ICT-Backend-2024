import { User } from '../models/User';

class UserRepository {
    static async createUser(name: string, email: string, password: string): Promise<User> {
        try {
            const newUser = await User.create({ name, email, password });
            return newUser;
        } catch (error: any) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    static async getUserById(id: number): Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error: any) {
            throw new Error('Error getting user by id: ' + error.message);
        }
    }

    static async deleteUser(id: number): Promise<boolean> {
        try {
            const deletedCount = await User.destroy({ where: { id } });
            return deletedCount > 0;
        } catch (error: any) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

export { UserRepository };
