import jwt from "jsonwebtoken"
import { SECRET_KEY } from '../config/config'

export const decodeToken = (token: string) => {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
            throw err
        } else {
            return decodedToken
        }
    })
}