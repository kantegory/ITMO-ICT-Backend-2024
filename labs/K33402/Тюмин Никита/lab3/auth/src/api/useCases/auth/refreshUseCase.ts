import { User } from "shared-database";
import Jwt from "../../../utils/jwt";
import { errors } from "shared-core";


class RefreshUseCase {
    static async run(user: User|null) {
        if (!user) throw new errors.UnauthenticatedError()
        let accessToken = Jwt.generateAccessToken(user.email)
        let refreshToken = Jwt.generateRefreshToken(user.email)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
}

export default RefreshUseCase