// 📁 src/routes/auditLog.routes.ts
import { Router } from 'express'
import { AuditLogController } from '../controllers/auditLog.controller'
import { validate } from '../middlewares/validation.middleware'
import { CreateAuditLogSchema } from '../types/validators/auditLog.schema'
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router()
const controller = new AuditLogController()

router.get('/', requireAuth, controller.getAll)
router.get('/user/:userId', requireAuth, controller.getByUser)
router.post('/', requireAuth, validate(CreateAuditLogSchema), controller.create)
router.delete('/:id', requireAuth, controller.delete)

export default router
