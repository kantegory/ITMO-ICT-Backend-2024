import sequelize from "../instances/db"
import RefreshToken from "../models/RefreshToken"
import { createToken } from "./createToken"

async function makeTokens(uId: number) {
    /**
     * Makes tokens for user with userId=`uId`, returns them
     */
    const refreshTokenRepository = sequelize.getRepository(RefreshToken)
    let refreshToken = await refreshTokenRepository.findOne({where: {userId: uId}})
    if (refreshToken) {
        await refreshToken.save() // updating
    } else {
        refreshToken = await refreshTokenRepository.create({userId: uId}) // creating if doesn't exist
    }
    const newJWT = createToken(uId)
    return {
        jwt: newJWT,
        refreshToken: refreshToken
    }
}

export default makeTokens