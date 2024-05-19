"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../config/jwt"));
const jwt = require('jsonwebtoken');
class TokenType {
}
TokenType.ACCESS = 'ACCESS';
TokenType.REFRESH = 'REFRESH';
class Jwt {
    static generateAccessToken(sub, payload = {}) {
        return this._signToken(sub, payload, TokenType.ACCESS, jwt_1.default.JWT_ACCESS_TOKEN_TTL);
    }
    static generateRefreshToken(sub, payload = {}) {
        return this._signToken(sub, payload, TokenType.REFRESH, jwt_1.default.JWT_REFRESH_TOKEN_TTL);
    }
    static _signToken(sub, payload, type, ttl) {
        const now = Date.now();
        const data = {
            sub: sub,
            type: type,
            iat: now,
            exp: now + ttl * 1000
        };
        return jwt.sign(data, jwt_1.default.JWT_SECRET, { algorithm: jwt_1.default.JWT_ALG });
    }
    static verify(token) {
        return jwt.verify(token, jwt_1.default.JWT_SECRET, { algorithms: ['HS256'] });
    }
}
exports.default = Jwt;
