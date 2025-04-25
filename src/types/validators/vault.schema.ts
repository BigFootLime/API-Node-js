import { z } from 'zod'

export const CreateVaultSchema = z.object({
  name: z.string().min(3, 'Vault name must be at least 3 characters'),
  owner: z.string().min(1, 'Owner ID is required'),
  members: z.array(z.string()).optional(),
  masterPassword: z.string().min(1, "Mot de passe maître requis"),
})

export const UpdateVaultSchema = z.object({
  name: z.string().min(3).optional(),
  members: z.array(z.string()).optional(),
  isDeleted: z.boolean().optional(),
})

export type CreateVaultInput = z.infer<typeof CreateVaultSchema>
export type UpdateVaultInput = z.infer<typeof UpdateVaultSchema>