import prisma from '../utils/prismaClient'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

class UserService {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany()
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  async createUser(
    email: string,
    password: string,
    name?: string
  ): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10)
    return prisma.user.create({
      data: { email, name, password: hashedPassword },
    })
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10)
    }
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    })
  }
}

export default new UserService()
