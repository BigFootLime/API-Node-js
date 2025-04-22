// 📁 src/models/vaultItem.model.ts
import { Schema, model, Types, Document } from 'mongoose'

export interface IVaultItem extends Document {
  vault: Types.ObjectId
  title: string
  type: 'password' | 'note' | 'apiKey'
  encryptedData: string // AES-256 encrypted content
  createdBy: Types.ObjectId
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

const vaultItemSchema = new Schema<IVaultItem>({
  vault: { type: Schema.Types.ObjectId, ref: 'Vault', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['password', 'note', 'apiKey'], required: true },
  encryptedData: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
})

export const VaultItemModel = model<IVaultItem>('VaultItem', vaultItemSchema)
