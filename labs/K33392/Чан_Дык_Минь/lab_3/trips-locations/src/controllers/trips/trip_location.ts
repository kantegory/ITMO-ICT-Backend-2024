import TripLocationService from '../../services/trips/trip_location';
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class TripLocationController {
    private tripLocationService: TripLocationService

    constructor() {
        this.tripLocationService = new TripLocationService()
    }

    createTripLocation = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.tripLocationService.create(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAllByTripId = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.tripLocationService.getAllByTripId(body.tripId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getAllByLocationId = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.tripLocationService.getAllByLocationId(body.locationId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const { body } = request;
            
            const data: any = await this.tripLocationService.getById(body.id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.tripLocationService.delete(body.id);
            response.status(201).send("Trip Location has been successfully deleted");
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

}