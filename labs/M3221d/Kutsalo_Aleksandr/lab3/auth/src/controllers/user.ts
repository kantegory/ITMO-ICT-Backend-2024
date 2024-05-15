import { NotUniqueError, UserNotFound, ValidationError } from "../errors/userErrors";
import jwt from 'jsonwebtoken'
import User from "../models/User"
import UserService from "../services/user"
import { isCorrectPassword } from "../utility/passwordCheck";
import makeTokens from "../utility/makeTokens";
import destroyTokens from "../utility/destroyTokens";
import verifyRefreshToken from "../utility/verifyRefreshToken";


class UserController {
    private userService: UserService; // lazy

    constructor() {
        this.userService = new UserService()
    }

    auth = async (request: any, response: any) => {
        try {
            const token = request.body.jwt as string

            if (token) {
                jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
                    if (err) {
                        // res.status(403).send("Invalid token")
                        // console.log(err.message)
                    } else {
                        console.log(decodedToken)
                        response.status(200).json({
                            "status": "success",
                            "userId": decodedToken.id
                        })
                        return
                    }
                })
            } else {
            }
        }
        catch (err) {
            if (err.name == "TypeError") {
                // res.status(403).send("Authorization is required for this page")
            } else {
                response.status(400).json({"status": err.message})
                return
            }
        }
        // Refresh token time
        try {
            const refreshToken = request.cookies.refresh_token
            if (refreshToken) {
                // Exists
                const out = await verifyRefreshToken(refreshToken)
                const isLegit = out[0]
                const userId = out[1]
                if (!isLegit) {
                    destroyTokens(response) // why not
                    response.status(403).send({"status": "Bad tokens"})
                    return
                } else {
                    // JWT doesn't exist, but Refresh Token exists and is valid. So now we make new ones
                    makeTokens(response)
                    response.status(200).json({
                        "status": "success",
                        "userId": userId
                    })
                    return
                }
            } else {
                response.status(403).send({"status": "Bad tokens"})
                return
            }
        } catch (err) {
            if (err.name == "TypeError") {
                response.status(403).send({"status": "Bad tokens"})
            } else {
                response.status(403).send({"status": "Other error"})
            }
            return
        }

    }

    get = async (request: any, response: any) => {
        try {
            const user: User | UserNotFound = await this.userService.getById(Number(request.params.id))
            response.status(200).json(user)
        } catch (error) {
            response.status(404).json({"response": "error", "error_message": error.message})
            return
        }
    }

    create = async (request: any, response: any) => {
        try {
            const user: User | ValidationError | NotUniqueError = await this.userService.createUser(request.body)
            
            response.locals.uId = user.id
            await makeTokens(response)
            
            response.status(200).json({'response': "success", 'userId': user.id})
            return
        } catch (error) {
            response.status(400).json({'response': 'error', 'error_message': error.message})
            return
        }
        
    }

    login = async (request: any, response: any) => {
        try {
            const user: User | UserNotFound = await this.userService.getByEmail(request.body.email)
            if (!isCorrectPassword(request.body.password, user.password)) {
                throw Error("Passwords don't match")
            }
            response.locals.uId = user.id
            await makeTokens(response)
            response.status(200).json({'response': "Success", 'userId': user.id})
        } catch (error) {
            response.status(405).json({'error': error.message})
        }
     }

    privatePage = async (request: any, response: any) => {
        response.status(200).json({'response': "Success", 'content': `Very protected auth only content for userID = ${response.locals.uId}`})
    }

    logout = async (request: any, response: any) => {
        await destroyTokens(response)
        response.status(200).json({'response': "Success", 'content': 'Cleaned current authorization'})
    }

}

export default UserController