// 📁 src/routes/session.routes.ts
import { Router } from 'express'
import { SessionController } from '../controllers/session.controller'
import { validate } from '../middlewares/validation.middleware'
import { CreateSessionSchema, RevokeSessionSchema } from '../types/validators/session.schema'

const router = Router()
const controller = new SessionController()

router.get('/', controller.getAll)
router.post('/', validate(CreateSessionSchema), controller.create)
router.delete('/', validate(RevokeSessionSchema), controller.revoke)
router.delete('/user/:userId', controller.deleteUserSessions)

export default router
