import { UserActivity } from '../../models/users-activities/userActivity'
class UserActivityService {

    async create(data: any): Promise<UserActivity> {
        try {
            const userActivity = await UserActivity.create(data);
            return userActivity;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<UserActivity> {
        try {
            const userActivity = await UserActivity.findByPk(id);
            if (!userActivity)
                throw new Error('User Activity not found');
            return userActivity;
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId: string): Promise<UserActivity[]> {
        try {
            const activities = await UserActivity.findAll({ where: { userId: userId } });
            return activities;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string, userId: string): Promise<number> {
        try {
            const deletedRowsCount = await UserActivity.destroy({
                where: { id, userId: userId },
            });
            if (deletedRowsCount === 0) {
                throw new Error('User Activity not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }

}

export default UserActivityService;