import user from '../../models/users/user'
import AuthService from '../../services/auth/auth'
import { getErrorMessage } from '../../utils/getErrorMessage';
// import jwt from 'jsonwebtoken'
// import { jwtOptions } from '../../middlewares/passport'
// import RefreshTokenService from '../../services/auth/RefreshToken'

class AuthController {
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
            const data : any = await this.authService.register(body)
            response.status(201).send(data)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    // me = async (request: any, response: any) => {
    //     response.send(request.user)
    // }

    // auth = async (request: any, response: any) => {
    //     const { body } = request

    //     const { email, password } = body

    //     try {
    //         const { user, checkPassword } = await this.userService.checkPassword(email, password)

    //         if (checkPassword) {
    //             const payload = { id: user.id }

    //             console.log('payload is', payload)

    //             // const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

    //             // const refreshTokenService = new RefreshTokenService(user)

    //             // const refreshToken = await refreshTokenService.generateRefreshToken()

    //             response.send('ok')
    //         } else {
    //             throw new Error('Login or password is incorrect!')
    //         }
    //     } catch (e: any) {
    //         response.status(401).send({ "error": e.message })
    //     }
    // }

    // refreshToken = async (request: any, response: any) => {
    //     const { body } = request

    //     const { refreshToken } = body

    //     const refreshTokenService = new RefreshTokenService()

    //     try {
    //         const { userId, isExpired } = await refreshTokenService
    //             .isRefreshTokenExpired(refreshToken)

    //         if (!isExpired && userId) {
    //             const user = await this.userService.getById(userId)

    //             const payload = { id: user.id }

    //             const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

    //             const refreshTokenService = new RefreshTokenService(user)

    //             const refreshToken = await refreshTokenService.generateRefreshToken()

    //             response.send({ accessToken, refreshToken })
    //         } else {
    //             throw new Error('Invalid credentials')
    //         }
    //     } catch (e) {
    //         response.status(401).send({ 'error': 'Invalid credentials' })
    //     }
    // }
}

export default AuthController