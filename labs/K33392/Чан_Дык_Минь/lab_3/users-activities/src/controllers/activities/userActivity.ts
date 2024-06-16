import UserActivityService from '../../services/users-activities/userActivity'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class UserActivityController {
    private userActivityService: UserActivityService

    constructor() {
        this.userActivityService = new UserActivityService()
    }

    createUserActivity = async (request: any, response: any) => {
        try {
            const { activityId } = request.body;
            const userId = request.userId;
            const data: any = await this.userActivityService.create({activityId, userId})
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAllByUserId = async (request: any, response: any) => {
        try {
            const userId = request.userId;
            const data: any = await this.userActivityService.getAllByUserId(userId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const { id } = request.body;
            const data: any = await this.userActivityService.getById(id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const { body } = request;
            const id = body.id;
            const userId = request.userId;
            const data: any = await this.userActivityService.delete(id, userId);
            response.status(201).send("User Activity has been deleted successfully!");
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

}