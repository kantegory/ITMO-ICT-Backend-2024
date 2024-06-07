export class UserAlreadyExists extends Error {
    private msg = "User already exists!";

    constructor() {
        super();
        this.message = this.msg;
    }
}

export class UserNotFound extends Error {
    private msg = "User was not found!";

    constructor() {
        super();
        this.message = this.msg;
    }
}