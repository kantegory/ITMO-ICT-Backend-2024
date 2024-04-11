import { decodeToken } from '../utility/decode_token'

const requireAuth = (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.jwt

        if (token) {
            try {
                const decodedToken = decodeToken(token)
                console.log(decodedToken)
                next()
            } catch (err) {
                res.status(403).send("Invalid token")
                    console.log(err.message)
            }

        } else {
            res.status(403).send("Authorization is required for this page")
        }

        console.log(token)
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