import RefreshToken from "../models/RefreshToken";


function setTokensInCookies(res: any, jwt: string, refreshToken?: RefreshToken): void {
    res.cookie('jwt', jwt, {httpOnly: true, maxAge: Number(process.env.TOKEN_AGE_MS)})
    if (refreshToken) {
        res.cookie('refresh_token', refreshToken.token, {
            httpOnly: true,
            maxAge: Number(process.env.REFRESH_TOKEN_AGE_MS)
        })
    }
}

export default setTokensInCookies