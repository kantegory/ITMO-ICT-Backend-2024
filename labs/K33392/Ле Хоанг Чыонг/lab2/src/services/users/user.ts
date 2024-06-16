import User from '../../models/users/user'
import { Location } from '../../models/locations/location';
import { UserActivity } from '../../models/activities/activity'
import { LocationActivity } from '../../models/activities/activity'
import { Op } from 'sequelize';
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
    async getLocationForUser(user_id: string, rating?: number): Promise<Location[]> {
        try {
            const activities = await UserActivity.findAll({ where: { user_id: user_id } });
          
            if (!activities || activities.length === 0) {
                return []; 
            }
            
            const activityIds = activities.map(activity => activity.activity_id);
    
            const locationSet: Set<string> = new Set();
            
            const locationPromises = activityIds.map(async activityId => {
                const locationsWithActivity = await LocationActivity.findAll({ where: { activity_id: activityId } });
                locationsWithActivity.forEach(location => {
                    locationSet.add(location.location_id);
                });
            });
    
            await Promise.all(locationPromises);
    
            const locationIds: string[] = [...locationSet];
            let locations: Location[];
            
            if (rating) {
                locations = await Location.findAll({
                    where: { 
                        id: locationIds,
                        rating: { [Op.gte]: rating } 
                    }, 
                    order: [['rating', 'DESC']], 
                });
            } else {
                locations = await Location.findAll({
                    where: { id: locationIds }, 
                    order: [['rating', 'DESC']], 
                });
            }
    
            return locations;
        } catch (error) {
            throw error;
        }
    }
    
    async getMe(userId: string) :Promise<any> {
        // Fetch the user with associated activities
        const user = await User.findByPk(userId, {
            include: [{ association: 'activities' }]
        });

        return user;
    }
}



export default UserService