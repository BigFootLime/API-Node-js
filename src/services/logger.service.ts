// 📁 src/services/logger.service.ts
import { AuditLogService } from './auditLog.service'

interface LogAuditParams {
  user: string
  action: string
  resourceType: string
  resourceId: string
  ip?: string
  userAgent?: string
}

export class LoggerService {
  private readonly auditLogService = new AuditLogService()

  async audit({ user, action, resourceType, resourceId, ip, userAgent }: LogAuditParams) {
    await this.auditLogService.create({
      user,
      action,
      resourceType,
      resourceId,
      ip,
      userAgent,
    })

    console.log(`[AUDIT] User ${user} performed ${action} on ${resourceType} (${resourceId})`)
  }

  info(message: string) {
    console.log(`[INFO] ${message}`)
  }

  warn(message: string) {
    console.warn(`[WARN] ${message}`)
  }

  error(message: string) {
    console.error(`[ERROR] ${message}`)
  }
}