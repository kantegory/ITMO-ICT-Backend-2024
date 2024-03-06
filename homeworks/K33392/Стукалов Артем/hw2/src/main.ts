import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { createHmac } from 'crypto'
import { AuthenticationError } from './errors'

const prisma = new PrismaClient()
const app = fastify({ logger: true })

// Просто для примера, не надо так делать
const TEMP_SECRET_KEY = 'NO_WAIFU_NO_WIFI'

app.get('/ping', async () => {
  return 'pong'
})

app.get('/users', async () => {
  const users = await prisma.user.findMany()
  return users
})

type GetUserByIdParams = {
  id: number
}

app.get<{
  Params: GetUserByIdParams
}>('/user/:id', async (req) => {
  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  })
  return user
})

type SignupBody = {
  username: string
  email: string
  password: string
}

app.post<{
  Body: SignupBody
}>(`/signup`, async (req) => {
  const { username, email, password } = req.body

  const user = await prisma.user.create({
    data: {
      email,
      username,
      passHash: createHmac('sha256', TEMP_SECRET_KEY)
        .update(password)
        .digest('hex'),
    },
  })

  return user
})

type SigninBody = {
  username: string
  password: string
}

app.post<{
  Body: SigninBody
}>(`/signin`, async (req) => {
  const { username, password } = req.body

  const passHash = createHmac('sha256', TEMP_SECRET_KEY)
    .update(password)
    .digest('hex')

  const user = await prisma.user.findFirst({
    where: {
      username,
      passHash,
    },
  })

  if (!user) {
    throw new AuthenticationError()
  }

  return user
})

type UpdateUserBody = {
  username?: string
  email?: string
}

type UpdateUserParams = {
  id: number
}

app.put<{
  Body: UpdateUserBody
  Params: UpdateUserParams
}>('/user/:id', async (req, res) => {
  const { email, username } = req.body
  const { id } = req.params

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        email,
      },
    })

    return updatedUser
  } catch (error) {
    console.error(error)
    return { error: `User does not exist` }
  }
})

async function main() {
  try {
    await app.listen({ port: 3000 })
    console.log('🚀 Server ready at: http://localhost:3000')
  } catch (err) {
    console.error(err)
    prisma.$disconnect()
    process.exit(1)
  }
}
main()

// app.listen({ port: 3000 }, (err) => {
//   if (err) {
//     console.error(err)
//     prisma.$disconnect()
//     process.exit(1)
//   }
//   console.log('🚀 Server ready at: http://localhost:3000')
// })
