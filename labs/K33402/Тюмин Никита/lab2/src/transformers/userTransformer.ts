import BaseTransformer from "./baseTransformer";
import User from "../models/user";


class UserTransformer extends BaseTransformer {
    constructor() {
        super();
        this.defaultIncludes = []
        this.availableIncludes = []
    }

    transform(user: User): Object {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    }
}

export default UserTransformer