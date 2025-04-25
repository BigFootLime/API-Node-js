// 📁 src/types/vault.types.ts

export interface Vault {
    id: string
    name: string
    owner: string // user ID
    members: string[] // array of user IDs
    masterPassword: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
  }
  