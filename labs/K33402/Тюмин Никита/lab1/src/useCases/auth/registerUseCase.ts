import User from "../../models/user";
const bcrypt = require('bcrypt')


interface IRegisterUser {
    firstName: string
    lastName: string
    email: string
    password: string
}

class RegisterUseCase {
    static async run(data: IRegisterUser): Promise<User> {
        return await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
        }, {returning: true})
    }
}

export default RegisterUseCase