import bcrypt from "bcrypt"

const checkPassword = async (user: any, password: string) => {
    return bcrypt.compareSync(password, user.password)
}

export default checkPassword