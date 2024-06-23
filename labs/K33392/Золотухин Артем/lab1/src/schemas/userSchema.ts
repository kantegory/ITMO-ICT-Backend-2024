import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
})

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
