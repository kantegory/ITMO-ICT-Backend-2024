import Fastify from 'fastify'
import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const app = Fastify()

const userCore = {
  email: z.string().email(),
  name: z.string().optional(),
}

const createUserSchema = z.object({
  ...userCore,
  password: z.string(),
})

const createUserResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

const { schemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
  },
  { $id: 'userSchemas' }
)

for (const schema of schemas) {
  app.addSchema(schema)
}

app.post(
  '/users',
  {
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: $ref('createUserResponseSchema'),
      },
    },
  },
  async (request, reply) => {
    try {
      const body = createUserSchema.parse(request.body)
      console.log('Request Body:', body)
      reply.code(201).send({ id: 1, email: body.email, name: body.name })
    } catch (e) {
      if (e instanceof z.ZodError) {
        reply.code(400).send(e.errors)
      } else {
        reply.code(500).send({ message: 'Internal Server Error' })
      }
    }
  }
)

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server running at ${address}`)
})
