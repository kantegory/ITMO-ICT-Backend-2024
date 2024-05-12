import bcryptjs from "bcryptjs"
import { UserAttributes } from "../models/users/User"

export default (user: UserAttributes, password: string) => {
    return bcryptjs.compareSync(password, user.password)
}