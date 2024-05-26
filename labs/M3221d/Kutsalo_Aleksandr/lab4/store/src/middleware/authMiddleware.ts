import jwt from 'jsonwebtoken'
import destroyTokens from '../utility/destroyTokens'
import axios from "axios";
import setTokensInCookies from "../utility/setTokensInCookies";

const requireAuth = async (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.jwt
        const refreshToken = req.cookies.refresh_token

        const authResponse = await axios.post(
            "http://localhost:4002/users/auth",
            {
                "jwt": token,
                "refresh_token": refreshToken
            }
        )
        if (authResponse.status != 200) {
            destroyTokens(res)
            res.status(403).send({"response": "Unauthorized"})
            return
        }
        setTokensInCookies(res, authResponse.data.jwt, authResponse.data.refresh_token.token)
        res.locals.uId=authResponse.data.uid
        next()
    } catch (error) {
        destroyTokens(res)
        res.status(401).json({"response": error.message})
    }
 
 }

export default requireAuth