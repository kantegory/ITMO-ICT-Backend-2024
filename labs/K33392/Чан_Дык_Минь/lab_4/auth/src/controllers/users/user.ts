import User from '../../models/users/user';
import UserService from '../../services/users/user'
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Request, Response } from 'express';

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService()
    }
    getAllUser = async (request: Request, response: Response) => {
        try {
            const user: User[] = await this.userService.getAll()
            response.status(201).send(user)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getUserById = async (request: Request, response: Response) => {
        try {
            const { id } = request.body;
            // console.log("controller id", id)
            const user: User = await this.userService.getById(id)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    updateActivities = async (request: any, response: any) => {
        const { activities } = request.body;
        const userId = request.user.id;
        try {
            const user: User = await this.userService.updateActivities(userId, activities)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
    
    delete = async (request: any, response: any) => {
        const userId = request.user.id;
        try {
            const number : number = await this.userService.delete(userId)
            
            response.status(201).send('User have successful deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    me = async (request: any, response: any) => {
        try {
            // Fetch the current user with associated activities
            const user: User = await this.userService.getMe(request.user.id);
            
            // Send the response
            response.send(user);
        } catch (error) {
            // Handle errors
            response.status(500).send(getErrorMessage(error));
        }
    }
}