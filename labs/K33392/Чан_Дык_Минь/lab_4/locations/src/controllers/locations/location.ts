import LocationService from '../../services/locations/location'
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Request, Response } from 'express';
import { LocationAttributes, Location } from '../../models/locations/location';

export default class LocationController {
    private locationService: LocationService

    constructor() {
        this.locationService = new LocationService()
    }

    create = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const location: LocationAttributes = await this.locationService.create(body)
            response.status(201).send(location)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }
    getLocationForUser = async (request: any, response: Response) => {
        try {
           
            const token = request.token
           
            const locations: LocationAttributes[] = await this.locationService.getLocationForUser(token);
    
            response.status(200).send(locations);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }
    getAll = async (request: any, response: Response) => {
        try {

            const { min_rating } = request.body;
            const locations: LocationAttributes[] = await this.locationService.getAll(min_rating);
            response.status(201).send(locations);

        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getById = async (request: Request, response: Response) => {
        try {
            const {id} = request.body;
            const location: LocationAttributes = await this.locationService.getById(id);
            response.status(201).send(location)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const { id } = request.body;
            const deletedLocation: number = await this.locationService.delete(id)
            response.status(201).send('Location has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    update = async (request: Request, response: Response) => {
        const { body } = request;
        const { id, ...data } = request.body;
        try {
            const updatedLocation: LocationAttributes = await this.locationService.update(id,data)
            response.status(201).send(updatedLocation)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

}