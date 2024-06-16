import BaseTransformer from "./baseTransformer";
import User from "../models/user";


class UserTransformer extends BaseTransformer {
    constructor() {
        super();
        this.defaultIncludes = ['tests']
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

    include_tests(user: User) {
        return this.collection([user,user], new TestTransformer())
    }
}

class TestTransformer extends BaseTransformer {
    constructor() {
        super();
        this.defaultIncludes = []
        this.availableIncludes = []
    }

    transform(user: any): Object {
        return {
            'kek': 'lol',
        }
    }
}

export default UserTransformer