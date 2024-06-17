import bcrypt from "bcrypt"
import { UserAttributes } from "../models/users/User"

export default (user: UserAttributes, password: string) => {
    return bcrypt.compareSync(password, user.password)
}