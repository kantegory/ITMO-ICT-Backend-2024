import User from '../../models/users/user'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import checkPassword from '../../utils/checkPassword'
require('dotenv').config()

if (!process.env.SECRET_KEY) {
    throw new Error('Missing SECRET_KEY in environment variables');
}

export const SECRET_KEY: Secret = process.env.SECRET_KEY;

class AuthService {

    async register(userData: any): Promise<User> {
        try {
            const user = await User.create(userData)
            return user
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const user = await User.findOne({ where: { email } })

            if (!user || !checkPassword(user, password))
                throw new Error('Email or password is not correct');

            const token = jwt.sign({ id: user.id?.toString() }, SECRET_KEY, {
                expiresIn: '2 days',
            });
            return { user , token: token };

        } catch (error) {
            throw error;
        }
    }



}


export default AuthService