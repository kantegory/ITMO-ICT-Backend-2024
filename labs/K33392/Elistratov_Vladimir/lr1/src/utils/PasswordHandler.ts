import bcrypt from "bcrypt"

class PasswordHandler {
    public hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }

    public decryptPassword(hashedPassword: string): boolean {
        return true
    }
}

export default PasswordHandler