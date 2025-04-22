// 📁 src/types/vaultItem.types.zod.ts
import { z } from 'zod'

export const CreateVaultItemSchema = z.object({
  vault: z.string().min(1, 'Vault ID is required'),
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['password', 'note', 'apiKey']),
  encryptedData: z.string().min(1, 'Encrypted content is required'),
  createdBy: z.string().min(1, 'Creator ID is required'),
})

export const UpdateVaultItemSchema = z.object({
  title: z.string().min(1).optional(),
  encryptedData: z.string().min(1).optional(),
  isDeleted: z.boolean().optional(),
})

export type CreateVaultItemInput = z.infer<typeof CreateVaultItemSchema>
export type UpdateVaultItemInput = z.infer<typeof UpdateVaultItemSchema>