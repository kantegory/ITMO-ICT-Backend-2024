import { Activity } from '../../models/activities/activity';
import ActivityService from '../../services/activities/activity'
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Request, Response } from 'express';


export default class ActivityController {
    private activityService: ActivityService

    constructor() {
        this.activityService = new ActivityService()
    }

    create = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const activity = await this.activityService.create(body)
            response.status(201).send(activity)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: Request, response: Response) => {
        try {
            const activities = await this.activityService.getAll()
            response.status(201).send(activities)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getById = async (request: Request, response: Response) => {
        try {
            const { id } = request.body;
            const activity: Activity = await this.activityService.getById(id);
            response.status(201).send(activity)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: Response) => {
        const { body } = request;
        const userId = request.user.id;
        const { activityId } = request.body;

        try {
            const updatedActivity: Activity = await this.activityService.update(activityId, { ...body, userId: userId })
            response.status(201).send(updatedActivity)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const { id } = request.body;
            const deletedActivity: number = await this.activityService.delete(id)
            
            response.status(201).send("Activity has been successfully deleted!")
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
}