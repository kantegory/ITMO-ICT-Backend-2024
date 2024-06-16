import sequelize from "../instances/db"
import RefreshToken from "../models/RefreshToken"
import isExpired from "./verifyExpiration"

async function verifyRefreshToken(token: string): Promise<[boolean, number]> {
    const refreshTokenRepository = sequelize.getRepository(RefreshToken)
    const refreshToken = await refreshTokenRepository.findOne({where: {token: token}})
    if (!refreshToken) {
        return [false, -1]
    }
    return [!isExpired(refreshToken.expirationDate), refreshToken.userId]
}

export default verifyRefreshToken