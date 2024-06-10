import { TripLocation } from  '../../models/trips/trip'; 


class TripLocationService {

    async create(data: any): Promise<TripLocation> {
        try {
            const tripLocation = await TripLocation.create(data);
            return tripLocation;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<TripLocation> {
        try {
            const tripLocation = await TripLocation.findByPk(id);
            if (!tripLocation)
                throw new Error('Trip Location not found');
            return tripLocation;
        } catch (error) {
            throw error;
        }
    }

    async getAllByTripId(tripId: string): Promise<TripLocation[]> {
        try {
            const tripLocations = await TripLocation.findAll({ where: { trip_id: tripId } });
            return tripLocations;
        } catch (error) {
            throw error;
        }
    }

    async getAllByLocationId(locationId: string): Promise<TripLocation[]> {
        try {
            const tripLocations = await TripLocation.findAll({ where: { location_id: locationId } });
            return tripLocations;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<number> {
        try {
            const deletedRowsCount = await TripLocation.destroy({
                where: { id },
            });
            if (deletedRowsCount === 0) {
                throw new Error('Trip Location not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default TripLocationService;
