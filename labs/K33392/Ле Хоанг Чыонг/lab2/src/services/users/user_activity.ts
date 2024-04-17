import { UserActivity } from '../../models/activities/activity'
class UserActivityService {

    async create(data: any): Promise<UserActivity> {
        try {
            const trip = await UserActivity.create(data);
            return trip;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<UserActivity> {
        try {
            const trip = await UserActivity.findByPk(id);
            if (!trip)
                throw new Error('User Activity not found');
            return trip;
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId: string): Promise<UserActivity[]> {
        try {
            const activities = await UserActivity.findAll({ where: { user_id: userId } });
            return activities;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string, userId: string): Promise<number> {
        try {
            const deletedRowsCount = await UserActivity.destroy({
                where: { id ,  user_id: userId },
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
