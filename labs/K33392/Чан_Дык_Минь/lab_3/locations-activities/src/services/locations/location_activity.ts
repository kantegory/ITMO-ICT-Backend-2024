import { LocationActivity } from '../../models/locations/locations_activities' 

class LocationActivityService {

    async create(data: any): Promise<LocationActivity> {
        try {
            const locationActivity = await LocationActivity.create(data);
            return locationActivity;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<LocationActivity> {
        try {
            const locationActivity = await LocationActivity.findByPk(id);
            if (!locationActivity)
                throw new Error('Location Activity not found');
            return locationActivity;
        } catch (error) {
            throw error;
        }
    }

    async getAllByActivityId(activityId: string): Promise<LocationActivity[]> {
        try {
            const locationActivities = await LocationActivity.findAll({ where: { activityId: activityId } });
            return locationActivities;
        } catch (error) {
            throw error;
        }
    }

    async getAllByLocationId(locationId: string): Promise<LocationActivity[]> {
        try {
            const locationActivities = await LocationActivity.findAll({ where: { locationId: locationId } });
            return locationActivities;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<number> {
        try {
            console.log(id)
            const deletedRowsCount = await LocationActivity.destroy({
                where: { id },
            });
            if (deletedRowsCount === 0) {
                throw new Error('Location Activity not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default LocationActivityService;
