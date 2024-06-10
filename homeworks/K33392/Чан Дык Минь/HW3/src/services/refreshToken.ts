import RefreshToken from "../models/refreshToken"
import { Users } from "../models/users"
import { randomUUID } from "crypto"
import dotenv from 'dotenv';
dotenv.config();


class RefreshTokenService {
    private user: Users | null

    constructor(user: Users | null = null) {
        this.user = user
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
            
            if (timeDelta > 0 && timeDelta < parseInt(<string>process.env.refreshTokenLifetime, 10)) {
                return { userId: tokenData.userId, isExpired: false }
            }

            return { userId: null, isExpired: true }
        }

        return { userId: null, isExpired: true }
    }
}

export default RefreshTokenService