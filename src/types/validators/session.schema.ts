// 📁 src/types/session.types.zod.ts
import { z } from 'zod'

export const CreateSessionSchema = z.object({
  user: z.string().min(1, 'User ID is required'),
  token: z.string().min(10, 'Token must be at least 10 characters'),
  expiresAt: z.coerce.date(),
})

export const RevokeSessionSchema = z.object({
  token: z.string().min(10, 'Token must be at least 10 characters'),
})

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>
export type RevokeSessionInput = z.infer<typeof RevokeSessionSchema>