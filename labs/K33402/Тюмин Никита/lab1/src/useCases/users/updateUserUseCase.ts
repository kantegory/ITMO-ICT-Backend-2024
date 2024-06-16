import User from "../../models/user";
import {NotFoundError} from "../../errors";

interface IUpdateUser {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
}

class UpdateUserUseCase {
    static async run(id: number, data: IUpdateUser): Promise<User> {
        const { firstName, lastName, email, password } = data;
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError('User does not exists')
        }
        await user.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        return user
    }
}

export default UpdateUserUseCase