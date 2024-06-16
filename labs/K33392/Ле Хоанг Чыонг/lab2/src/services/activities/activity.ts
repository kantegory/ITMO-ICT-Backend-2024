import {Activity} from '../../models/activities/activity'
class ActivityService {

    async create(activityData: any): Promise<Activity> {
        try {
            const activity = await Activity.create(activityData)
            return activity
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<Activity> {
        try {
            const activity = await Activity.findByPk(id)
            if (!activity) 
                throw new Error('Not Found');
            return activity
        }
        catch (error) {
            throw error;
        }
    }
    async getAll(): Promise<Activity[]> {
        try {
            const user = await Activity.findAll()
            return user
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, activityData: any): Promise<Activity> {
        try {
            const [updatedRowsCount, updatedActivity] = await Activity.update(activityData, {
                where: { id },
                returning: true,
            });

            if (updatedRowsCount === 0) {
                throw new Error('Activity not found');
            }
            return updatedActivity[0];
        } catch (error) {
            throw error;
        }
    }
    async delete(id: number): Promise<number> {
        try {
            const deletedRowsCount = await Activity.destroy({
                where: { id },
            });
            if (deletedRowsCount === 0) {
                throw new Error('Activity not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }

}

export default ActivityService