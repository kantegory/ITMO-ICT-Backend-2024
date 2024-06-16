import User from "../../models/user";
import {NotFoundError} from "../../errors";


class FindUserUseCase {
    static async run(id: number): Promise<User> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError('User does not exists')
        }
        return user
    }
}

export default FindUserUseCase