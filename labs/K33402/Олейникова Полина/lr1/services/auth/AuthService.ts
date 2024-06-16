import User, { UserCreationAttributes } from '../../models/users/User'
import jwt, { Secret } from 'jsonwebtoken';
import checkPassword from '../../utils/checkPassword'
import RefreshTokenService from './RefreshTokenService'

require('dotenv').config()

if (!process.env.SECRET_KEY) {
    throw new Error('Missing SECRET_KEY in environment variables');
}

export const SECRET_KEY: Secret = process.env.SECRET_KEY;

class AuthService {
    async register(userData: UserCreationAttributes): Promise<User> {
        try {
            const user = await User.create(userData)
            return user
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string): Promise<{ token: string, refreshToken: string }> {
        try {
            const user = await User.findOne({ where: { email } })
            if (!user || !checkPassword(user, password)) {
                throw new Error('Email or password is not correct');
            }
            const refreshTokenService = new RefreshTokenService(user)
            const refreshToken = await refreshTokenService.generateRefreshToken()
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '2 days' });
            return { refreshToken: refreshToken, token: token };
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(refreshToken: string): Promise<{ token: string, refreshToken: string }> {
        const refreshTokenService = new RefreshTokenService()
        try {
            const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken)
            if (!isExpired && userId) {
                const user = await User.findByPk(userId)
                const refreshTokenService = new RefreshTokenService(user)
                const refreshToken = await refreshTokenService.generateRefreshToken()
                const accessToken = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '2 days' });
                return { refreshToken: refreshToken, token: accessToken };
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (error) {
            throw error;
        }
    }
}


export default AuthService