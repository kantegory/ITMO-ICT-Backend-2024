import jwt from "jsonwebtoken"
import { SECRET_KEY, TOKEN_AGE_MS } from "../config/config"

const maxTokenAge = TOKEN_AGE_MS / 1000

export const createToken = (id: number) => {

    return jwt.sign({ id }, SECRET_KEY, {
        expiresIn: maxTokenAge
    })
}