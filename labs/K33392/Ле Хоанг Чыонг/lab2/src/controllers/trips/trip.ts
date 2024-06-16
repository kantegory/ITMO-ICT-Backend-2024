import { Trip } from '../../models/trips/trip';
import TripService from '../../services/trips/trip'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class TripController {
    private tripService: TripService

    private serializeTrip(trip: any) {
        // Create a shallow copy of the user object
        const serializeTrip = { ...trip.toJSON() };

        // Remove unnecessary fields from each activity
        serializeTrip.locations = serializeTrip.locations.map((location: any) => {
            const { id, name, rating } = location;
            return { id, name, rating };
        });

        return serializeTrip;
    }

    constructor() {
        this.tripService = new TripService()
    }

    create = async (request: any, response: any) => {
        const dateStartString = request.body.dateStart;
        const dateEndString = request.body.dateEnd;

        // Parse date strings into Date objects
        const dateStart = new Date(dateStartString);
        const dateEnd = new Date(dateEndString);
        try {
            const { body } = request;
            const userId = request.user.id;
            const trip: any = await this.tripService.create({ ...body, userId: userId, dateStart: dateStart, dateEnd: dateEnd });
            response.status(201).send(trip)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const trips: any = await this.tripService.getAll()

            const serializeTrips = trips.map((trip: any) => this.serializeTrip(trip));
            
            response.status(201).send(serializeTrips)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request;
        const userId = request.user.id;
        const tripId = request.params.trip_id;

        try {
            const updatedTrip: any = await this.tripService.update(tripId, { ...body, userId: userId })
            response.status(201).send(updatedTrip)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
    
    getById = async (request: any, response: any) => {
        try {
            const { body } = request;
            const tripId = body.trip_id;
            const trip: any = await this.tripService.getById(tripId);
            const serializeTrip = this.serializeTrip(trip);
            response.status(201).send(serializeTrip)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getTripByFiltering = async (request: any, response: any) => {
        try {
            const user_id = request.user.id;
            let {  dateStart, dateEnd } = request.body;
            const { locations } = request.body;
            
            const dateStartString = request.body.dateStart;
            const dateEndString = request.body.dateEnd;

            if(dateStartString ){
                dateStart = new Date(dateStartString);
            }
            if(dateEndString ){
                dateEnd = new Date(dateEndString);
            }
                
            // Parse date strings into Date objects
            console.log("controller: ", locations)
            const trips: Trip[] = await this.tripService.findTrips(user_id, dateStart, dateEnd, locations);
            response.status(201).send(trips)

        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const tripId = request.params.id;
            const deletedReview: any = await this.tripService.delete(tripId)
            
            response.status(201).send('Trip has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
}