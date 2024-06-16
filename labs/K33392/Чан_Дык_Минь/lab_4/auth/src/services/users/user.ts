import User from '../../models/users/user'
import { Op } from 'sequelize';
class UserService {
    async getById(id: string): Promise<User> {
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
    async updateActivities(userId: string, newActivities: string[]): Promise<User> {
        try {
            // Fetch the user record from the database
            const user = await User.findByPk(userId);
    
            // Check if the user exists
            if (!user) {
                throw new Error('User not found');
            }

            if (!Array.isArray(newActivities)) {
                throw new Error('New activities must be an array');
            }
    
            // Update the activities field with the new array
            user.activities = newActivities;
    
            // Save the updated user record
            await user.save();
    
            return user;
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
    
    async getMe(userId: string) :Promise<any> {
        // Fetch the user with associated activities
        const user = await User.findByPk(userId);
        return user;
    }
}

export default UserService