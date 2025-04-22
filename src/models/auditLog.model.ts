// 📁 src/models/auditLog.model.ts
import { Schema, model, Types, Document } from 'mongoose'

export interface IAuditLog extends Document {
  user: Types.ObjectId
  action: string
  resourceType: string
  resourceId: string
  ip?: string
  userAgent?: string
  createdAt: Date
}

const auditLogSchema = new Schema<IAuditLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  resourceType: { type: String, required: true },
  resourceId: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
}, {
  timestamps: { createdAt: true, updatedAt: false },
})

export const AuditLogModel = model<IAuditLog>('AuditLog', auditLogSchema)