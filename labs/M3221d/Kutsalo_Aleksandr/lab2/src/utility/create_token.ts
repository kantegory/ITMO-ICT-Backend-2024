import { config } from "dotenv"
import jwt from "jsonwebtoken"

config()

const maxTokenAge = Number(process.env.TOKEN_AGE_MS) / 1000

export const createToken = (id: number) => {

    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxTokenAge
    })
}