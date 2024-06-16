import User from '../../models/user/User'
import UserService from '../../services/user/User'
import UserError from '../../errors/user/User'

import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middleware/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'

import axios from 'axios'

import BookServiceError from '../../errors/bookService/BookServise'

import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../configs/.env') })

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    getAll = async (request: any, response: any) => {
        try {
            const users: User[] | UserError = await this.userService.getAll()

            response.send(users)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    get = async (request: any, response: any) => {
        try {
            const user: User | UserError = await this.userService.getById(
                Number(request.params.id)
            )

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const user : User|UserError = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    auth = async (request: any, response: any) => {
        const { body } = request

        const { email, password } = body

        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)

            if (checkPassword) {
                const payload = { id: user.id }

                console.log('payload is', payload)

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                const refreshTokenService = new RefreshTokenService(user)

                const refreshToken = await refreshTokenService.generateRefreshToken()

                response.send({ accessToken, refreshToken })
            } else {
                throw new Error('Login or password is incorrect!')
            }
        } catch (e: any) {
            response.status(401).send({ "error": e.message })
        }
    }

    refreshToken = async (request: any, response: any) => {
        const { body } = request

        const { refreshToken } = body

        const refreshTokenService = new RefreshTokenService()

        try {
            const { userId, isExpired } = await refreshTokenService
                .isRefreshTokenExpired(refreshToken)
            
            console.log('REFRESH TOKEN:', userId, isExpired)

            if (!isExpired && userId) {
                const user = await this.userService.getById(userId)

                const payload = { id: user.id }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                const refreshTokenService = new RefreshTokenService(user)

                const refreshToken = await refreshTokenService.generateRefreshToken()

                response.send({ accessToken, refreshToken })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e) {
            response.status(401).send({ 'error': 'Invalid credentials' })
        }
    }

    bookList = async (request: any, response: any) => {
        try {
            const id = Number(request.params.id)
            const url = `http://localhost:${process.env.BOOK_SERVICE_PORT}/bookService/books/list/${id}`
            
            const { data, status } = await axios.get(url);
            console.log(data)
            if (! [200, 201].includes(status)) {
                throw new BookServiceError(data)
            }
            response.send(data)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    exchangeRequestList = async (request: any, response: any) => {
        try {
            const id = Number(request.params.id)
            const url = `http://localhost:${process.env.BOOK_SERVICE_PORT}/bookService/exchangeRequests/list/${id}`
            
            const { data, status } = await axios.get(url);
            console.log(data)
            if (! [200, 201].includes(status)) {
                throw new BookServiceError(data)
            }
            response.send(data)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default UserController