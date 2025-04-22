// 📁 src/models/schemas/session.schema.ts
import { Schema, model } from 'mongoose'

const sessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

export const SessionModel = model('Session', sessionSchema)