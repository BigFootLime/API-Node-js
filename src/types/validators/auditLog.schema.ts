// 📁 src/types/auditLog.types.zod.ts
import { z } from 'zod'

export const CreateAuditLogSchema = z.object({
  user: z.string().min(1, 'User ID is required'),
  action: z.string().min(1, 'Action is required'),
  resourceType: z.string().min(1, 'Resource type is required'),
  resourceId: z.string().min(1, 'Resource ID is required'),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
})

export type CreateAuditLogInput = z.infer<typeof CreateAuditLogSchema>