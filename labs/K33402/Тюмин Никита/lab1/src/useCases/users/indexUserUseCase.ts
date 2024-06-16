import User from "../../models/user";


class IndexUserUseCase {
    static async run(): Promise<Array<User>> {
        return User.findAll()
    }
}

export default IndexUserUseCase