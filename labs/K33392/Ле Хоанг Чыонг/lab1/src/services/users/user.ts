import { error } from 'console'
import User from '../../models/users/user'
// import UserError from '../../errors/users/User'
import checkPassword from '../../utils/checkPassword'

class UserService {
    async getById(id: number) : Promise<any> {
        try {
            const user = await User.findByPk(id)
            if (user) return user
        }
        catch (error) {
            throw new  Error('Not Found');
        }
    }

    async getAll(): Promise<any> {
        try {
            const user = await User.findAll()
            return user
        } catch (error) {
            throw error;
        }
    }




    async create(userData: any): Promise<User> {
        try {
            const user = await User.create(userData)
            return user
        } catch (error) {
            throw error;
        }
    }

    async update(id: number , userData: any): Promise<any> {
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