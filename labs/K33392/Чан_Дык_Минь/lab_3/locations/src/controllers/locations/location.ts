import LocationService from '../../services/locations/location'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class LocationController {
    private locationService: LocationService

    constructor() {
        this.locationService = new LocationService()
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
            response.status(201).send(locations);

        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const {id} = request.body;
            const location: any = await this.locationService.getById(id);
            response.status(201).send(location)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const {id} = request.body;
            const deletedLocation: any = await this.locationService.delete(id)
            response.status(201).send('Location has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request;
        const { id, ...data } = request.body;
        try {
            const updatedLocation: any = await this.locationService.update(id,data)
            response.status(201).send(updatedLocation)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

}