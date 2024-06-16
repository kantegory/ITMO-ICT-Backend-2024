import { Sequelize } from 'sequelize-typescript';
import { Trip } from '../../models/trips/trip';
import { Location } from '../../models/locations/location';
import { TripLocation } from '../../models/trips/trip';
import { Op } from 'sequelize';
import User from '../../models/users/user'
class TripService {

    async create(tripData: any): Promise<Trip> {
        try {
            const trip = await Trip.create(tripData);
            return trip;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<Trip> {
        try {
            const trip = await Trip.findByPk(id, {
                include: [{ association: 'locations' }]
            });
            if (!trip)
                throw new Error('Trip not found');
            return trip;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<Trip[]> {
        try {
            const trips = await Trip.findAll({
                include: [{ association: 'locations' }]
            });
            return trips;
        } catch (error) {
            throw error;
        }
    }

    async findTrips(userId?: string, dateStart?: Date, dateEnd?: Date, locations?: string[]): Promise<Trip[]> {
        try {
            let tripIds: string[] = [];
            console.log(locations)

            if (locations && locations.length > 0) {

                const tripLocations = await TripLocation.findAll({
                    where: {
                        location_id: {
                            [Op.in]: locations
                        }
                    },
                    attributes: ['trip_id'],
                    raw: true
                });
                tripIds = tripLocations.map(tripLocation => tripLocation.trip_id);

            }
            let whereConditions: any = {};
            if(userId)
                console.log("service: ", userId)
                whereConditions.userId = userId
                
            if (dateStart) {
                console.log("dateStart", dateStart)
                whereConditions.dateStart = {
                    [Op.gte]: dateStart
                };
            }
            if (dateEnd) {
                whereConditions.dateEnd = {
                    [Op.lte]: dateEnd
                };
            }
            if (tripIds.length > 0) {
                whereConditions.id = {
                    [Op.in]: tripIds
                };
            }
            console.log("whereConditions: ", whereConditions)
            const trips = await Trip.findAll({
                where: whereConditions,
                include: [
                    {
                        association: 'locations',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        attributes: ['id', 'name']
                    }
                ]
            });
            return trips;
        } catch (error) {
            throw error;
        }
    }



    async update(id: string, tripData: any): Promise<Trip> {
        try {
            const [, updatedRowsCount]: [any, any] = await Trip.update(tripData, {
                where: { id, userId: tripData.userId },
                returning: true,
            });

            if (updatedRowsCount === 0) {
                throw new Error('Trip not found or not updated');
            }

            const updatedTrip = await Trip.findOne({ where: { id } });
            if (!updatedTrip) {
                throw new Error('Updated trip not found');
            }
            return updatedTrip;
        } catch (error) {
            throw error;
        }


    }

    async delete(id: string): Promise<number> {
        try {
            const deletedRowsCount = await Trip.destroy({
                where: { id },
            });
            if (deletedRowsCount === 0) {
                throw new Error('Trip not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }

}

export default TripService;
