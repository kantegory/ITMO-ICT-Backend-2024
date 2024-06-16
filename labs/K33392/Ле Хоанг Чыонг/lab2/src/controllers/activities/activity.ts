import ActivityService from '../../services/activities/activity'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class ActivityController {
    private activityService: ActivityService

    constructor() {
        this.activityService = new ActivityService()
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request;
            const activity: any = await this.activityService.create(body)
            response.status(201).send(activity)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const activities: any = await this.activityService.getAll()
            response.status(201).send(activities)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const activityId = request.params.id;
            const activity: any = await this.activityService.getById(activityId);
            response.status(201).send(activity)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request;
        const userId = request.user.id;
        const activityId = request.params.trip_id;

        try {
            const updatedActivity: any = await this.activityService.update(activityId, { ...body, userId: userId })
            response.status(201).send(updatedActivity)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const activityId = request.params.id;
            const deletedActivity: any = await this.activityService.delete(activityId)
            
            response.status(201).send(deletedActivity)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
 
}