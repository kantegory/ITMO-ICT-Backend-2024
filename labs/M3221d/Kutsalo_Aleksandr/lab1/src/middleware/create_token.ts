import jwt from "jsonwebtoken"

export const maxTokenAge = 3 * 24 * 60 * 60

export const createToken = (id: number) => {

    return jwt.sign({ id }, 'boiler_secretkey', {
        expiresIn: maxTokenAge
    })
}