
import { RefreshTokenType } from '../../models/auth/RefreshToken';
import { UserAttributes } from '../../models/users/User';
import AuthService from '../../services/auth/AuthService'

export default class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    login = async (request: any, response: any) => {
        try {
            const { email, password } = request.body;
            const data: RefreshTokenType | Error = await this.authService.login(email, password)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(404).send({ "error": error.toString() })
        }
    }

    register = async (request: any, response: any) => {
        const { body } = request
        try {
            const data: UserAttributes | Error = await this.authService.register(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    refreshToken = async (request: any, response: any) => {
        const { body } = request
        const { refreshToken } = body
        try {
            const data: RefreshTokenType | Error = await this.authService.refreshToken(refreshToken)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(401).send({ "error": error.toString() })
        }
    }
}
