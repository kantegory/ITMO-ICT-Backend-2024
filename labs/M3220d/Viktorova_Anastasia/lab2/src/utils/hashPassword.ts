import bcrypt from "bcrypt"

const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10)
}

export default hashPassword