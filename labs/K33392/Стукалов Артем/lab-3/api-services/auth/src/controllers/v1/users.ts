import { server } from '../../server'
import { UserNotFound, WrongPassword } from '../../errors/users'
import * as UsersSchemaV1 from '../../schemas/v1/users'
import * as UsersService from '../../services/users'
import { ControllerHandler } from '@repo/shared/fastify'
import { verifyPassword } from '../../utils/auth'
import { publishMessage } from '../../amqp'

export const register: ControllerHandler<
  typeof UsersSchemaV1.register
> = async (req, res) => {
  const { username, password } = req.body
  const user = await UsersService.cerate(username, password)

  await publishMessage({
    kind: 'CreateTestArea',
    userId: user.id,
  })
  return res.code(200).send(user)
}

export const login: ControllerHandler<typeof UsersSchemaV1.login> = async (
  req,
  res
) => {
  const { username, password } = req.body

  const user = await UsersService.getByUsername(username)
  if (!user) {
    throw new UserNotFound()
  }

  const isPassCorrect = verifyPassword({
    password: password,
    salt: user.passSalt,
    hash: user.passHash,
  })
  if (!isPassCorrect) {
    throw new WrongPassword()
  }

  return res.code(200).send({
    token: server.jwt.sign({
      id: user.id,
    }),
  })
}

export const getSelf: ControllerHandler<typeof UsersSchemaV1.getSelf> = async (
  req,
  res
) => {
  const user = await UsersService.getById(req.user.id)
  if (!user) {
    throw new UserNotFound()
  }

  return res.code(200).send(user)
}
