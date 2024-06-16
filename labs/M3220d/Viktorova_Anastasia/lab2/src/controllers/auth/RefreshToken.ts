
import RefreshToken from '../../models/auth/RefreshToken'
import UserError from '../../errors/user/User'
import RefreshTokenService from '../../services/auth/RefreshToken'

class RefreshTokenController {
    private refreshTokenService: RefreshTokenService

    constructor() {
        this.refreshTokenService = new RefreshTokenService()
    }

    getAll = async (request: any, response: any) => {
        try {
            const refreshTokens: RefreshToken[] | UserError = await this.refreshTokenService.getAll()

            response.send(refreshTokens)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default RefreshTokenController