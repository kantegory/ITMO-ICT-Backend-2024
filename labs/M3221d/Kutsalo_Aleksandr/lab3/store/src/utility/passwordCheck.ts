import { compareSync } from "bcrypt"


export const isCorrectPassword = (providedPassword: string, storedPassword: string) => {
    return compareSync(providedPassword, storedPassword)
}