import LocationActivityService from '../../services/locations/location_activity';
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class LocationActivityController {
    private locationActivityService: LocationActivityService

    constructor() {
        this.locationActivityService = new LocationActivityService()
    }

    createLocationActivity = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.locationActivityService.create(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAllByActivityId = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.locationActivityService.getAllByActivityId(body.activity_id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getAllByLocationId = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.locationActivityService.getAllByLocationId(body.location_id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const { body } = request;
            const id = body.link_id;
            const data: any = await this.locationActivityService.getById(id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const { body } = request;
            const data: any = await this.locationActivityService.delete(body.link_id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

}