import LocationActivityService from '../../services/locations-activities/location_activity';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { LocationActivity } from '../../models/locations-activities/locations_activities';
import { Request, Response } from 'express';

export default class LocationActivityController {
    private locationActivityService: LocationActivityService

    constructor() {
        this.locationActivityService = new LocationActivityService()
    }

    createLocationActivity = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const data: LocationActivity = await this.locationActivityService.create(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAllByActivityId = async (request: Request, response: Response) => {
        try {
            const { activityId } = request.body;
           
            const data: LocationActivity[] = await this.locationActivityService.getAllByActivityId(activityId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getAllByLocationId = async (request: Request, response: Response) => {
        try {
            const { locationId } = request.body;
            const data: LocationActivity[] = await this.locationActivityService.getAllByLocationId(locationId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getById = async (request: Request, response: Response) => {
        try {
            const { id } = request.body;
          
            const data: LocationActivity = await this.locationActivityService.getById(id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            // console.log(body)
            const data: number = await this.locationActivityService.delete(body.id);
            response.status(201).send('Location-Activity has been successfully deleted');
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

}