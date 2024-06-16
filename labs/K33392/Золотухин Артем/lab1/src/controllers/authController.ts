import { FastifyRequest, FastifyReply } from 'fastify'
import authService from '../services/authService'
import { loginUserSchema, createUserSchema } from '../schemas/userSchema'

class AuthController {
  async login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = loginUserSchema.parse(req.body)
    const token = await authService.login(email, password)
    if (token) {
      reply.send(token)
    } else {
      reply.status(401).send({ message: 'Invalid credentials' })
    }
  }

  async register(req: FastifyRequest, reply: FastifyReply) {
    const { email, name, password } = createUserSchema.parse(req.body)
    const user = await authService.register(email, name, password)
    reply.send(user)
  }
}

export default new AuthController()
