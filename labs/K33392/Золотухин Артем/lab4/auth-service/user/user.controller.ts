import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput, LoginRequest } from './user.schema'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { app } from '../app'

const prisma = new PrismaClient()

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  const body = request.body
  console.log(request.body)
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(body.password, salt)
    const user = await prisma.user.create({
      data: { ...body, password: hash },
    })
    return reply.code(201).send(user)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export const loginHandler = async (
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply
) => {
  const body = request.body
  console.log(body)
  const user = await prisma.user.findUnique({ where: { email: body.email } })
  console.log(user)
  if (!user) {
    return reply.code(401).send({ message: 'Invalid email or password' })
  }

  const correctPassword = await bcrypt.compare(body.password, user.password)
  console.log(correctPassword)
  if (correctPassword) {
    const { password, ...rest } = user
    console.log(password, rest)
    return { accessToken: app.jwt.sign(rest) }
  }

  return reply.code(401).send({ message: 'Invalid email or password' })
}
