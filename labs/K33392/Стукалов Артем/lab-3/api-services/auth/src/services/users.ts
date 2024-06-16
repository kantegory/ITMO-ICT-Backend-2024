import { prisma, User } from '@repo/shared/db'
import { hashPassword } from '../utils/auth'

export async function cerate(
  username: string,
  password: string
): Promise<User> {
  const { hash, salt } = hashPassword(password)

  const user = await prisma.user.create({
    data: {
      username,
      createdAt: Math.floor(Date.now() / 1000),
      passHash: hash,
      passSalt: salt,
    },
  })

  return user
}

export async function getByUsername(
  username: string
): Promise<User | undefined> {
  const user =
    (await prisma.user.findFirst({
      where: {
        username,
      },
    })) ?? undefined

  return user
}

export async function getById(userId: number): Promise<User | undefined> {
  const user =
    (await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })) ?? undefined

  return user
}
