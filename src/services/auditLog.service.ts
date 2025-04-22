// 📁 src/services/auditLog.service.ts
import { CreateAuditLogInput } from '../types/validators/auditLog.schema'
import { AuditLogModel, IAuditLog } from '../models/auditLog.model'
import { NotFoundError } from '../utils/error.utils'

export class AuditLogService {
  async findAll(): Promise<IAuditLog[]> {
    return AuditLogModel.find().populate('user')
  }

  async findByUser(userId: string): Promise<IAuditLog[]> {
    return AuditLogModel.find({ user: userId }).populate('user')
  }

  async create(data: CreateAuditLogInput): Promise<IAuditLog> {
    const log = new AuditLogModel(data)
    return log.save()
  }

  async delete(id: string): Promise<boolean> {
    const result = await AuditLogModel.findByIdAndDelete(id)
    if (!result) throw new NotFoundError(`Log with id ${id} not found`)
    return true
  }
}