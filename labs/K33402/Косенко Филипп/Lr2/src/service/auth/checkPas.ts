import bcrypt from "bcrypt";
import { UserAtributes } from "../../models/users";

export default (user: UserAtributes, password: string) => {
    return bcrypt.compare(password, user.password)
}