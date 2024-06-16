import LocationService from '../../services/locations/location'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class LocationController {
    private locationService: LocationService

    constructor() {
        this.locationService = new LocationService()
    }

    private serializeLocation(location: any) {
        // Create a shallow copy of the user object
        const serializeLocation = { ...location.toJSON() };

        // Remove unnecessary fields from each activity
        serializeLocation.activities = serializeLocation.activities.map((activity: any) => {
            const { id, name } = activity;
            return { id, name };
        });

        return serializeLocation;
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request;
            const location: any = await this.locationService.create(body)
            response.status(201).send(location)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: any, response: any) => {
        try {

            const { min_rating } = request.body;
            const locations: any = await this.locationService.getAll(min_rating);
   
            const serializedLocations = locations.map((location: any) => this.serializeLocation(location));

            response.status(201).send(serializedLocations);

        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const locationId = request.params.id;
            const location: any = await this.locationService.getById(locationId);
            const serializedLocation = this.serializeLocation(location);
            response.status(201).send(serializedLocation)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const locationId = request.params.id;
            const deletedLocation: any = await this.locationService.delete(locationId)
            
            response.status(201).send('Location has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request;
        const userId = request.user.id;
        const locationId = request.params.trip_id;

        try {
            const updatedLocation: any = await this.locationService.update(locationId, { ...body, userId: userId })
            response.status(201).send(updatedLocation)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

}