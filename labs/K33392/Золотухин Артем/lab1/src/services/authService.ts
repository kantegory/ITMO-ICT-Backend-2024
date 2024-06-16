import prisma from '../utils/prismaClient'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string } | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', {
        expiresIn: '1h',
      })
      return { token }
    }
    return null
  }

  async register(
    email: string,
    name: string | undefined,
    password: string
  ): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10)
    return prisma.user.create({
      data: { email, name, password: hashedPassword },
    })
  }
}

export default new AuthService()
