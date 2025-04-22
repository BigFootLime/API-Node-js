// 📁 src/models/schemas/vault.schema.ts
import { Schema, model } from 'mongoose'

const vaultSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const VaultModel = model('Vault', vaultSchema)
