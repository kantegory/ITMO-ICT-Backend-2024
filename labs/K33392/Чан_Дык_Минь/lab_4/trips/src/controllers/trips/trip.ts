import { Trip } from '../../models/trips/trip';
import TripService from '../../services/trips/trip';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Request, Response } from 'express';

export default class TripController {
    private tripService: TripService;

    constructor() {
        this.tripService = new TripService();
    }

    create = async (request: Request, response: Response) => {
        console.log(request.body);
        const dateStartString = request.body.dateStart;
        const dateEndString = request.body.dateEnd;

        // Parse date strings into Date objects
        const dateStart = new Date(dateStartString);
        const dateEnd = new Date(dateEndString);
        try {
            const { body } = request;
            //const userId = request.user.id;
            const trip: Trip = await this.tripService.create({ ...body, dateStart: dateStart, dateEnd: dateEnd });
            response.status(201).send(trip)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: Request, response: Response) => {
        try {
            const trips: Trip[] = await this.tripService.getAll()
            
            response.status(201).send(trips)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: Response) => {
        const { body } = request;
        const tripId = body.trip_id;
        const userId = request.userId;

        try {
            const updatedTrip: Trip = await this.tripService.update(tripId, { ...body, userId: userId })
            response.status(201).send(updatedTrip)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
    
    getById = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const tripId = body.trip_id;
            const trip: Trip = await this.tripService.getById(tripId);

            response.status(201).send(trip)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }


    delete = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const tripId = body.trip_id;
            const deletedReview: number = await this.tripService.delete(tripId)
            
            response.status(201).send('Trip has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
}