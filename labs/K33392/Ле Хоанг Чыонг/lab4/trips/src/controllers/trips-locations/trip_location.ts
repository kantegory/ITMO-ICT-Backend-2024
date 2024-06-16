import TripLocationService from '../../services/trips-locations/trip_location';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { TripLocation } from '../../models/trips-locations/trip_location';
import { Request, Response } from 'express';

export default class TripLocationController {
    private tripLocationService: TripLocationService

    constructor() {
        this.tripLocationService = new TripLocationService()
    }

    createTripLocation = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const data: TripLocation = await this.tripLocationService.create(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAllByTripId = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const data: TripLocation[] = await this.tripLocationService.getAllByTripId(body.tripId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getAllByLocationId = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const data: TripLocation[] = await this.tripLocationService.getAllByLocationId(body.locationId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getById = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            
            const data: TripLocation = await this.tripLocationService.getById(body.id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const data: number = await this.tripLocationService.delete(body.id);
            response.status(201).send("Trip Location has been successfully deleted");
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

}