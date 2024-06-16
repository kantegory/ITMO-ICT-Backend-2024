import User from "../../models/user";
import Jwt from "../../utils/jwt";
const bcrypt = require('bcrypt')


interface ILoginData {
    email: string
    password: string
}

class LoginUseCase {
    static async run(data: ILoginData) {
        //@ts-ignore
        const user = await User.findOne({where: { email: data.email }});
        if (!user) {
            throw new Error('Login failed.')
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            throw new Error('Login failed.')
        }

        let accessToken = Jwt.generateAccessToken(data.email)
        let refreshToken = Jwt.generateRefreshToken(data.email)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
}

export default LoginUseCase