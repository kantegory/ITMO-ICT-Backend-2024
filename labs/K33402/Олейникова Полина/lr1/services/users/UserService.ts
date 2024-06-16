import User, { UserAttributes } from '../../models/users/User'
import checkPassword from '../../utils/checkPassword'
import hashPassword from '../../utils/hashPassword'

class UserService {
    async getById(id: number): Promise<User> {
        try {
            const user = await User.findByPk(id)
            if (!user) {
                throw new Error('Not Found');
            }
            return user
        }
        catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const user = await User.findAll()
            return user
        } catch (error) {
            throw error;
        }
    }

    async update(user: UserAttributes, userData: Pick<UserAttributes, 'email' | 'name'>): Promise<User> {
        try {
            const [updatedRowsCount, updatedUser] = await User.update(
                { name: userData.name, email: userData.email },
                {
                    where: { id: user.id },
                    returning: true,
                });

            if (updatedRowsCount === 0) {
                throw new Error('User not found');
            }
            return updatedUser[0];
        } catch (error) {
            throw error;
        }
    }


    async changePassword<Body extends {oldPassword: string, newPassword: string}>(user: UserAttributes, userData: Body): Promise<User> {
        try {
            if (!checkPassword(user, userData.oldPassword)) {
                throw new Error('Password is not correct');
            }
            const [updatedRowsCount, updatedUser] = await User.update(
                { password: hashPassword(userData.newPassword) },
                {
                    where: { id: user.id },
                    returning: true,
                });

            if (updatedRowsCount === 0) {
                throw new Error('User not found');
            }
            return updatedUser[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(user: UserAttributes): Promise<number> {
        try {
            const deletedRowsCount = await User.destroy({ where: { id: user.id } });
            if (deletedRowsCount === 0) {
                throw new Error('User not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService