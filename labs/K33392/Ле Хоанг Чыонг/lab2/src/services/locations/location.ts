import { Op } from 'sequelize';
import { Location } from '../../models/locations/location';
import Review from '../../models/reviews/review';

class LocationService {

    async create(locationData: any): Promise<Location> {
        try {
            const location = await Location.create(locationData);
            return location;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<Location> {
        try {
            const location = await Location.findByPk(id, {
                include: [{ 
                    association: 'reviews',
                }, 
                {
                    association: 'activities',
                    attributes: ['id', 'name'],
                }]
            });
            if (!location) 
                throw new Error('Location not found');
            return location;
        } catch (error) {
            throw error;
        }
    }

    async getAll(rating?: number): Promise<Location[]> {
        try {
            let whereCondition: any = {};
    
            if (rating) {
                whereCondition.rating = { [Op.gte]: rating };
            }
    
            const locations = await Location.findAll({
                include: [{ 
                    association: 'reviews',
                }, 
                {
                    association: 'activities',
                    attributes: ['id', 'name'],
                }],
                where: whereCondition, 
            });
    
            return locations;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, locationData: any): Promise<Location> {
        try {
            const [, updatedRowsCount]: [any, any] = await Location.update(locationData, {
                where: { id },
                returning: true,
            });

            if (updatedRowsCount === 0) {
                throw new Error('Location not found');
            }
            const updatedLocation = await Location.findOne({ where: { id } });
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
