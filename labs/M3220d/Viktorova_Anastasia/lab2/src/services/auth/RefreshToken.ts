import RefreshToken from "../../models/auth/RefreshToken"
import User from "../../models/user/User"
import { randomUUID } from "crypto"
import UserError from '../../errors/user/User'
import path from 'path'
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../configs/.env') })

class RefreshTokenService {
    private user: User | null

    constructor(user: User | null = null) {
        this.user = user
    }

    async getAll() : Promise<RefreshToken[]> {
        const refreshTokens = await RefreshToken.findAll()

        if (refreshTokens) return refreshTokens

        throw new UserError('Not found!')
    }

    generateRefreshToken = async () : Promise<string> => {
        const token = randomUUID()

        const userId = this.user?.id

        await RefreshToken.create({ token, userId })

        return token
    }

    isRefreshTokenExpired = async (token: string) : Promise<{ userId: number|null, isExpired: boolean }> => {
        const refreshToken = await RefreshToken.findOne({ where: { token } })

        if (refreshToken) {
            const tokenData = refreshToken.toJSON()

            const currentDate = new Date()
            const timeDelta = currentDate.getTime() - tokenData.createdAt.getTime()

            if (timeDelta > 0 && timeDelta < Number(process.env.REFRESH_TOKEN_LIFEYIME)) {
                return { userId: tokenData.userId, isExpired: false }
            }

            return { userId: null, isExpired: true }
        }

        return { userId: null, isExpired: true }
    }
}

export default RefreshTokenService