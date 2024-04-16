import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
config()

const requireAuth = (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.jwt

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
                if (err) {
                    res.status(403).send("Invalid token")
                    console.log(err.message)
                } else {
                    console.log(decodedToken)
                    res.locals.uId = decodedToken.id
                    next()
                }
            })
        } else {
            res.status(403).send("Authorization is required for this page")
        }
    }
    catch (err) {
        if (err.name == "TypeError") {
            res.status(403).send("Authorization is required for this page")
        } else {
            res.status(400).send(err.message)
        }
    }
 
 }

export default requireAuth