import User from "../models/user";
import { NotFoundError } from "../errors";


class UserService {
    static async findById(id: number): Promise<User> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError('User does not exists')
        }
        return user
    }

    static async findAll(): Promise<Array<User>> {
        return User.findAll()
    }

    static async deleteById(id: number): Promise<void> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError('User does not exists')
        }

        await user.destroy();
    }

    static async update(id: number, data: any): Promise<User> {
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

export default UserService