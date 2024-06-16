import User from '../../models/users/user';
import AuthService from '../../services/auth/auth'
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Request, Response } from 'express';

export default class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    login = async (request: Request, response: Response) => {
        try {
            const { email, password } = request.body;
            const data = await this.authService.login(email, password)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    register = async (request: Request, response: Response) => {
        const { body } = request
        try {
            const data: User = await this.authService.register(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    refreshToken = async (request: Request, response: Response) => {
        const { body } = request

        const { refreshToken } = body
        try {
            const data = await this.authService.refreshToken(refreshToken)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(401).send(getErrorMessage(error))
        }
    }
}
