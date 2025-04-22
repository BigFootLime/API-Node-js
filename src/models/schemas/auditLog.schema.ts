// 📁 src/models/schemas/auditLog.schema.ts
import { Schema, model } from 'mongoose'

const auditLogSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    resourceType: { type: String, required: true },
    resourceId: { type: String, required: true },
    ip: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

export const AuditLogModel = model('AuditLog', auditLogSchema)