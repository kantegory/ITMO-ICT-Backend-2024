import UserService from '../../services/users/user'
import Location from '../../models/locations/location';
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class UserController {
    private userService: UserService;

    private serializeUser(user: any) {
        // Create a shallow copy of the user object
        const serializedUser = { ...user.toJSON() };

        // Remove unnecessary fields from each activity
        serializedUser.activities = serializedUser.activities.map((activity: any) => {
            const { id, name } = activity;
            return { id, name };
        });

        return serializedUser;
    }

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

    getLocationForUser = async (request: any, response: any) => {
        try {
            const user_id = request.user.id;
            const { min_rating } = request.body;
            const locations: Location[] = await this.userService.getLocationForUser(user_id, min_rating);
            response.status(201).send(locations)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const userId = request.user.id;
        try {
            const user : any = await this.userService.update(userId, body)
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
            
            // Serialize the user object to remove unnecessary fields from activities
            const serializedUser = this.serializeUser(user);
            
            // Send the response
            response.send(serializedUser);
        } catch (error) {
            // Handle errors
            response.status(500).send(getErrorMessage(error));
        }
    }


}