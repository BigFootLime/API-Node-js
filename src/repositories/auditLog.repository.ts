// 📁 src/repositories/auditLog.repository.ts
import { MongooseRepository } from './mongoose.repository'
import { AuditLogModel, IAuditLog } from '../models/auditLog.model'

export class AuditLogRepository extends MongooseRepository<IAuditLog, IAuditLog> {
  constructor() {
    super(AuditLogModel)
  }

  protected mapToEntity(doc: any): IAuditLog {
    const { _id, ...rest } = doc.toObject()
    return { _id, ...rest }
  }

  async findByUser(userId: string): Promise<IAuditLog[]> {
    const docs = await this.model.find({ user: userId }).exec()
    return docs.map((doc) => this.mapToEntity(doc))
  }
}