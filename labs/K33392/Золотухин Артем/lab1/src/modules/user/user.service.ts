import { hashPassword } from '../../utils/hash'
import prisma from '../../utils/prisma'
import { CreateUserInput } from './user.schema'

const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input

  const { hash, salt } = await hashPassword(password)

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  })

  return user
}

export default createUser

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } })
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  })
}
