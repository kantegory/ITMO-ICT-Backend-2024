import { FastifyRequest, FastifyReply } from 'fastify'
import userService from '../services/userService'
import { User } from '@prisma/client'

class UserController {
  async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
    const users = await userService.getAllUsers()
    reply.send(users)
  }

  async getUserById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const user = await userService.getUserById(parseInt(id, 10))
    reply.send(user)
  }

  async createUser(req: FastifyRequest, reply: FastifyReply) {
    const { email, name, password } = req.body as {
      email: string
      name?: string
      password: string
    }
    const newUser = await userService.createUser(email, password, name)
    reply.send(newUser)
  }

  async updateUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const data = req.body as Partial<User>
    const updatedUser = await userService.updateUser(parseInt(id, 10), data)
    reply.send(updatedUser)
  }

  async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const deletedUser = await userService.deleteUser(parseInt(id, 10))
    reply.send(deletedUser)
  }
}

export default new UserController()
