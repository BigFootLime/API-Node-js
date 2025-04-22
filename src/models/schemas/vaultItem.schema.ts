// 📁 src/models/schemas/vaultItem.schema.ts
import { Schema, model } from 'mongoose'

const vaultItemSchema = new Schema(
  {
    vault: { type: Schema.Types.ObjectId, ref: 'Vault', required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['password', 'note', 'apiKey'],
      required: true,
    },
    encryptedData: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export const VaultItemModel = model('VaultItem', vaultItemSchema)