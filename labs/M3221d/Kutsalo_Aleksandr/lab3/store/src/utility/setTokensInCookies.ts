export default function setTokensInCookies(res: any, jwt: string, refreshToken?: string): void {
    res.cookie('jwt', jwt, {httpOnly: true, maxAge: Number(process.env.TOKEN_AGE_MS)})
    if (refreshToken) {
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: Number(process.env.REFRESH_TOKEN_AGE_MS)
        })
    }
}