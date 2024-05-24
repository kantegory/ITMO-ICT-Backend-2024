import { User } from "shared-database";
import Jwt from "../../../utils/jwt";
import { errors } from "shared-core";
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
            throw new errors.UnauthenticatedError()
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            throw new errors.UnauthenticatedError()
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