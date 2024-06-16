
import AuthService from '../../services/auth/auth'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    login = async (request: any, response: any) => {
        try {
            const { email, password } = request.body;
            const data: any = await this.authService.login(email, password)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    register = async (request: any, response: any) => {
        const { body } = request
        try {
            const data: any = await this.authService.register(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    refreshToken = async (request: any, response: any) => {
        const { body } = request

        const { refreshToken } = body
        try {
            const data: any = await this.authService.refreshToken(refreshToken)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(401).send(getErrorMessage(error))
        }
    }
}
