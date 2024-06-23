import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  name: z.string().optional(),
}

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
})

const createUserResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().optional(),
})

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
})

const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginRequest = z.infer<typeof loginSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
  },
  { $id: 'userSchemas' }
)
