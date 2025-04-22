// 📁 src/models/session.model.ts
import { Schema, model, Types, Document } from 'mongoose'

export interface ISession extends Document {
  user: Types.ObjectId
  token: string // refresh token or session ID
  expiresAt: Date
  createdAt: Date
}

const sessionSchema = new Schema<ISession>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

export const SessionModel = model<ISession>('Session', sessionSchema)