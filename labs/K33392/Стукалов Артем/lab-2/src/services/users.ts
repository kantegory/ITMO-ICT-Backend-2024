import { prisma } from 'config/db'
import { hashPassword } from 'utils/auth'

import { User } from '@prisma/client'

export async function cerate(
  username: string,
  password: string,
): Promise<User> {
  const { hash, salt } = hashPassword(password)

  const user = await prisma.user.create({
    data: {
      username,
      created_at: Math.floor(Date.now() / 1000),
      pass_hash: hash,
      pass_salt: salt,
    },
  })

  return user
}

export async function getByUsername(
  username: string,
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
