// 📁 src/routes/vaultItem.routes.ts
import { Router } from 'express'
import { VaultItemController } from '../controllers/vaultItem.controller'
import { validate } from '../middlewares/validation.middleware'
import { CreateVaultItemSchema, UpdateVaultItemSchema } from '../types/validators/vaultItem.schema'
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router()
const controller = new VaultItemController()

router.get('/', requireAuth, controller.getAll)
router.get('/:id', requireAuth, controller.getById)
router.get('/vault/:vaultId', requireAuth, controller.getByVault)
router.post('/', requireAuth, validate(CreateVaultItemSchema), controller.create)
router.put('/:id', requireAuth, validate(UpdateVaultItemSchema), controller.update)
// router.delete('/:id', requireAuth, controller.delete)

export default router