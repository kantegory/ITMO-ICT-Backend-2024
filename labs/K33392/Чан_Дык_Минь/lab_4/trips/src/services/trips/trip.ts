import { Sequelize } from 'sequelize-typescript';
import { Trip, TripCreationAttributes } from '../../models/trips/trip';
import { Op } from 'sequelize';

class TripService {

    async create(tripData: TripCreationAttributes): Promise<Trip> {
        try {
            const trip: Trip = await Trip.create(tripData);
            console.log("tripData: ", tripData)
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
            const trips: Trip[] = await Trip.findAll();
            return trips;
        } catch (error) {
            throw error;
        }
    }

    
    async update(id: string, tripData: any): Promise<Trip> {
        try {
            const [updatedRowsCount, updatedTrips]: [number, Trip[]] = await Trip.update(tripData, {
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
