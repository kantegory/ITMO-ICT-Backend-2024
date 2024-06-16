import User from "../../models/user";
import Jwt from "../../utils/jwt";
import {UnauthenticatedError} from "../../errors";


class RefreshUseCase {
    static async run(user: User|null) {
        if (!user) throw new UnauthenticatedError()
        let accessToken = Jwt.generateAccessToken(user.email)
        let refreshToken = Jwt.generateRefreshToken(user.email)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
}

export default RefreshUseCase