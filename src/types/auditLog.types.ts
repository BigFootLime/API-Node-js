// 📁 src/types/auditLog.types.ts

export interface AuditLog {
    id: string
    user: string
    action: string
    resourceType: string
    resourceId: string
    ip?: string
    userAgent?: string
    createdAt: string
  }