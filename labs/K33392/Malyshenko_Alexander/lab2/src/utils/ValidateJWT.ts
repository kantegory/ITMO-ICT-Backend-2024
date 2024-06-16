import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken";

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers.authorization
    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
        try {
            const bearerToken = headerToken.slice(7)
            console.log(`${bearerToken}`)
            const res = jwt.verify(bearerToken, process.env.JWTKEY || "error")
            next()
        } catch (e) {
            res.status(401).send({"error": e})
        }

    } else {
        res.status(401).json({"mag": "Access token denied"})
    }
}

export default validateJWT