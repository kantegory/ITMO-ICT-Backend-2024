import User from "../models/user";
const bcrypt = require('bcrypt');
import Jwt from "../utils/jwt";
import {UnauthenticatedError} from "../errors";


class AuthService {

    static async register(data: any): Promise<User> {
        return await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
        }, {returning: true})
    }

    static async login(data: any) {
        //@ts-ignore
        const user = await User.findOne({where: { email: data.email }});
        if (!user) {
            throw new Error('Not found user by email: ' + data.email)
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            throw new Error('Password is incorrect')
        }

        let accessToken = Jwt.generateAccessToken(data.email)
        let refreshToken = Jwt.generateRefreshToken(data.email)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }

    static async refreshToken(user: User|null) {
        if (!user) throw new UnauthenticatedError()
        let accessToken = Jwt.generateAccessToken(user.email)
        let refreshToken = Jwt.generateRefreshToken(user.email)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
}

export default AuthService