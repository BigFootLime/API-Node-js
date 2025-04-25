// 📁 src/models/vault.model.ts
import { Schema, model, Types, Document } from 'mongoose'

export interface IVault extends Document {
  name: string
  owner: Types.ObjectId // référence vers l'utilisateur propriétaire
  members: Types.ObjectId[] // utilisateurs ayant accès
  masterPassword: string // mot de passe maître
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

const vaultSchema = new Schema<IVault>({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  masterPassword: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
})

export const VaultModel = model<IVault>('Vault', vaultSchema)