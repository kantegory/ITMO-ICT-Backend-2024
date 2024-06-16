import UserActivityService from '../../services/users/user_activity';
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class UserActivityController {
    private userActivityService: UserActivityService

    constructor() {
        this.userActivityService = new UserActivityService()
    }

    createUserActivity = async (request: any, response: any) => {
        try {
            const { body } = request;
            const userId = request.user.id;
            const data: any = await this.userActivityService.create({ ...body, user_id: userId })
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAllByUserId = async (request: any, response: any) => {
        try {
            const { body } = request;
            const userId = request.user.id;
            const data: any = await this.userActivityService.getAllByUserId(userId);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const { body } = request;
            const id = body.link_id;
            const data: any = await this.userActivityService.getById(id);
            response.status(201).send(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const { body } = request;
            const id = body.link_id;
            const userId = request.user.id;
            const data: any = await this.userActivityService.delete(id, userId);
            response.status(201).sendStatus(data);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

}