import { Op } from 'sequelize';
import { Location, LocationAttributes } from '../../models/locations/location';
import axios from 'axios';
import { WhereOptions } from 'sequelize';
class LocationService {

    async create(locationData: LocationAttributes): Promise<Location> {
        try {
            const location = await Location.create(locationData);
            return location;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<Location> {
        try {
            const location = await Location.findByPk(id);
            if (!location)
                throw new Error('Location not found');
            return location;
        } catch (error) {
            throw error;
        }
    }

    async getAll(rating?: number): Promise<Location[]> {
        try {
            let whereCondition: WhereOptions = {};

            if (rating) {
                whereCondition.rating = { [Op.gte]: rating };
            }

            const locations = await Location.findAll({
                where: whereCondition,
            });

            return locations;
        } catch (error) {
            throw error;
        }
    }

    async getLocationForUser(token : string): Promise<Location[]> {
        try {
            const response = await axios.get('http://localhost:8000/users-activities/v1/all-user-activity',  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const activities = response.data
            if (!activities || activities.length === 0) {
                return [];
            }
            const activityIds = activities.map((activity: { activityId: string; }) => activity.activityId);
    
            const locationSet: Set<string> = new Set();
            console.log(activityIds)
            const locationPromises = activityIds.map(async (activityId: string) => {
                try {
                    const response = await axios.post('http://localhost:8000/locations-activities/v1/activity', {
                        activityId: activityId
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const locationsWithActivity = response.data;
                    locationsWithActivity.forEach((location: { locationId: string; }) => {
                        locationSet.add(location.locationId);
                    });
                } catch (error) {
                    console.error(`Error fetching locations for activityId ${activityId}:`, error);
                }
            });
    
            await Promise.all(locationPromises);
    
            const locationIds: string[] = [...locationSet];
            const locations = await Location.findAll({
                where: {
                    id: locationIds 
                }
            });
            
            
            return locations;
        } catch (error) {
            throw error;
        }
    }


    async update(id: string, locationData: Partial<LocationAttributes>): Promise<Location> {
        try {
            const [affectedRowsCount, updatedRows]: [number, Location[]] = await Location.update(locationData, {
                where: { id },
                returning: true,
            });
    
            if (affectedRowsCount === 0) {
                throw new Error('Location not found');
            }
    
            const updatedLocation = updatedRows[0];
            if (!updatedLocation) {
                throw new Error('Updated location not found');
            }
    
            return updatedLocation;
        } catch (error) {
            throw error;
        }
    }
    

    async delete(id: number): Promise<number> {
        try {
            const deletedRowsCount = await Location.destroy({
                where: { id },
            });
            if (deletedRowsCount === 0) {
                throw new Error('Location not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }

}

export default LocationService;
