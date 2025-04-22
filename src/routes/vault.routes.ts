// 📁 src/routes/vault.routes.ts
import { Router } from 'express'
import { VaultController } from '../controllers/vault.controller'
import { validate } from '../middlewares/validation.middleware'
import { CreateVaultSchema, UpdateVaultSchema } from '../types/validators/vault.schema'
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router()
const controller = new VaultController()

router.get('/', requireAuth, controller.getAll)
router.get('/:id', requireAuth, controller.getById)
router.post('/', requireAuth, validate(CreateVaultSchema), controller.create)
router.put('/:id', requireAuth, validate(UpdateVaultSchema), controller.update)
// router.delete('/:id', requireAuth, controller.delete)

export default router