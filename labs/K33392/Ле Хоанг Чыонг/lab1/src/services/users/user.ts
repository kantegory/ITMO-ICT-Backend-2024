import User from '../../models/users/user'
class UserService {
    async getById(id: number): Promise<User> {
        try {
            const user = await User.findByPk(id)
            if (!user) 
                throw new Error('Not Found');
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
    async update(id: number, userData: any): Promise<User> {
        try {
            const [updatedRowsCount, updatedUser] = await User.update(userData, {
                where: { id },
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
    async delete(id: number): Promise<number> {
        try {
            const deletedRowsCount = await User.destroy({
                where: { id },
            });
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