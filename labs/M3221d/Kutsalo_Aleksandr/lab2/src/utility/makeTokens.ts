import sequelize from "../instances/db"
import RefreshToken from "../models/RefreshToken"
import { createToken } from "./createToken"

async function makeTokens(res: any) {
    // requires uId in res.locals
    const uId: number = res.locals.uId
    const refreshTokenRepository = sequelize.getRepository(RefreshToken)
    let refreshToken = await refreshTokenRepository.findOne({where: {userId: uId}})
    if (refreshToken) {
        await refreshToken.save() // updating
    } else {
        refreshToken = await refreshTokenRepository.create({userId: uId}) // creating if doesn't exist
    }
    const newJWT = createToken(uId)
    res.cookie('jwt', newJWT, {httpOnly: true, maxAge: Number(process.env.TOKEN_AGE_MS)})
    res.cookie('refresh_token', refreshToken.token, {httpOnly: true, maxAge: Number(process.env.REFRESH_TOKEN_AGE_MS)})
}

export default makeTokens