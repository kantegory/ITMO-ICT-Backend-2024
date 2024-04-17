import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import verifyRefreshToken from '../utility/verifyRefreshToken'
import destroyTokens from '../utility/destroyTokens'
import makeTokens from '../utility/makeTokens'
config()

const requireAuth = async (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.jwt

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
                if (err) {
                    // res.status(403).send("Invalid token")
                    // console.log(err.message)
                } else {
                    console.log(decodedToken)
                    res.locals.uId = decodedToken.id
                    next()
                }
            })
        } else {
            // res.status(403).send("Authorization is required for this page")
        }
    }
    catch (err) {
        if (err.name == "TypeError") {
            // res.status(403).send("Authorization is required for this page")
        } else {
            res.status(400).send(err.message)
        }
    }
    // Refresh token time
    try {
        const refreshToken = req.cookies.refresh_token
        if (refreshToken) {
            // Exists
            const out = await verifyRefreshToken(refreshToken)
            const isLegit = out[0]
            const userId = out[1]
            if (!isLegit) {
                destroyTokens(res) // why not
                res.status(403).send("Authorization is required for this page")
            } else {
                // JWT doesn't exist, but Refresh Token exists and is valid. So now we make new ones
                res.locals.uId = userId
                makeTokens(res)
                next()
            }
        } else {
            res.status(403).send("Authorization is required for this page")
        }
    } catch (err) {
        if (err.name == "TypeError") {
            res.status(403).send("Authorization is required for this page")
        } else {
            res.status(400).send(err.message)
        }
    }
 
 }

export default requireAuth