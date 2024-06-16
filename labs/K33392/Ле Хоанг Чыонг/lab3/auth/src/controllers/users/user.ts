import UserService from '../../services/users/user'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService()
    }
    getAllUser = async (request: any, response: any) => {
        try {
            const user: any = await this.userService.getAll()
            response.status(201).send(user)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getUserById = async (request: any, response: any) => {
        try {
            const { id } = request.body;
            // console.log("controller id", id)
            const user: any = await this.userService.getById(id)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    updateActivities = async (request: any, response: any) => {
        const { activities } = request.body;
        const userId = request.user.id;
        try {
            const user : any = await this.userService.updateActivities(userId, activities)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
    
    delete = async (request: any, response: any) => {
        const userId = request.user.id;
        try {
            const number : any = await this.userService.delete(userId)
            
            response.status(201).send('User have successful deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    me = async (request: any, response: any) => {
        try {
            // Fetch the current user with associated activities
            const user = await this.userService.getMe(request.user.id);
            
            // Send the response
            response.send(user);
        } catch (error) {
            // Handle errors
            response.status(500).send(getErrorMessage(error));
        }
    }


}