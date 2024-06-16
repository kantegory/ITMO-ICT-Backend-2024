import jwtConfig from "../config/jwt";
const jwt = require('jsonwebtoken');

class TokenType {
    static ACCESS = 'ACCESS'
    static REFRESH = 'REFRESH'
}

export interface JwtToken {
    sub: string,
    type: TokenType,
    iat: Number,
    exp: Number,
}

class Jwt {
    static generateAccessToken(sub: string, payload: Object = {}): string {
        return this._signToken(
            sub,
            payload,
            TokenType.ACCESS,
            jwtConfig.JWT_ACCESS_TOKEN_TTL,
        )
    }
    static generateRefreshToken(sub: string, payload: Object = {}): string {
        return this._signToken(
            sub,
            payload,
            TokenType.REFRESH,
            jwtConfig.JWT_REFRESH_TOKEN_TTL,
        )
    }
    static _signToken(sub: string, payload: Object, type: string, ttl: number): string {
        const now = Date.now()
        const data = {
            sub: sub,
            type: type,
            iat: now,
            exp: now + ttl * 1000
        }
        return jwt.sign(data, jwtConfig.JWT_SECRET, { algorithm: jwtConfig.JWT_ALG })
    }
    static verify(token: string): JwtToken {
        return jwt.verify(token, jwtConfig.JWT_SECRET, {algorithms: ['HS256']})
    }
}

export default Jwt