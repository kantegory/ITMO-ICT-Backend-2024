import { FastifyReply, FastifyRequest } from 'fastify'
import createUser, { findUserByEmail, findUsers } from './user.service'
import { CreateUserInput, LoginRequest } from './user.schema'
import bcrypt from 'bcrypt'
import { app } from '../../app'

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput
  }>,
  reply: FastifyReply
) => {
  const body = request.body

  try {
    const user = await createUser(body)
    return reply.code(201).send(user)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export const loginHandler = async (
  request: FastifyRequest<{
    Body: LoginRequest
  }>,
  reply: FastifyReply
) => {
  const body = request.body

  const user = await findUserByEmail(body.email)

  if (!user) {
    return reply.code(401).send({ message: 'Invalid email or password' })
  }

  const correctPassword = await bcrypt.compare(body.password, user.password)

  if (correctPassword) {
    const { password, ...rest } = user
    return { accessToken: app.jwt.sign(rest) }
  }

  return reply.code(401).send({ message: 'Invalid email or password' })
}

export async function getUsersHandler() {
  const users = await findUsers()
  return users
}
