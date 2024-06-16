import bcrypt from "bcrypt"

class PasswordHandler {
    public hashPassword(password: string){
        return bcrypt.hash(password, 10)
    }

    public decryptPassword(hashedPassword: string): boolean {
        return true
    }

    public async comparePassword(hashedPassword: string, normalPassword: string) {
        return await bcrypt.compare(normalPassword, hashedPassword)
    }
}

export default PasswordHandler