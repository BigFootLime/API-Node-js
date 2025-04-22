// 📁 src/types/vaultItem.types.ts

export interface VaultItem {
    id: string
    vault: string
    title: string
    type: 'password' | 'note' | 'apiKey'
    encryptedData: string
    createdBy: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
  }