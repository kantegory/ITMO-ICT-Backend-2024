const jwtConfig = {
    JWT_ALG: process.env.JWT_ALG,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_TOKEN_TTL: Number(process.env.JWT_ACCESS_TOKEN_TTL),
    JWT_REFRESH_TOKEN_TTL: Number(process.env.JWT_REFRESH_TOKEN_TTL),
}

export default jwtConfig