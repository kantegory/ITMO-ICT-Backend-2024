import bcrypt from "bcrypt"

class PasswordHandler {
    public hashPassword(password: string){
        return bcrypt.hash(password, 10)
    }

    public async comparePassword(normalPas: string, hashedPas: any) {
         return await bcrypt.compare(normalPas, hashedPas)
    }
}

export default PasswordHandler