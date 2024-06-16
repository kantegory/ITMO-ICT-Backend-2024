import User from "../../models/user";
import { NotFoundError } from "../../errors";


class DestroyUserUseCase {
    static async run(id: number): Promise<void> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError('User does not exists')
        }

        await user.destroy();
    }
}

export default DestroyUserUseCase