"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 📁 src/routes/vaultItem.routes.ts
const express_1 = require("express");
const vaultItem_controller_1 = require("../controllers/vaultItem.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const vaultItem_schema_1 = require("../types/validators/vaultItem.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const verifyMasterPassword_middleware_1 = require("../middlewares/verifyMasterPassword.middleware");
const router = (0, express_1.Router)();
const controller = new vaultItem_controller_1.VaultItemController();
router.get('/', auth_middleware_1.requireAuth, controller.getAll);
router.get('/:id', auth_middleware_1.requireAuth, controller.getById);
router.get('/vault/:vaultId', auth_middleware_1.requireAuth, controller.getByVault);
router.post('/', auth_middleware_1.requireAuth, (0, validation_middleware_1.validate)(vaultItem_schema_1.CreateVaultItemSchema), controller.create);
router.put('/:id', auth_middleware_1.requireAuth, (0, validation_middleware_1.validate)(vaultItem_schema_1.UpdateVaultItemSchema), controller.update);
router.post('/verify-password', auth_middleware_1.requireAuth, verifyMasterPassword_middleware_1.verifyMasterPassword, controller.getAllItemsForVault // ✅ No .bind, no wrapper needed
);
// router.delete('/:id', requireAuth, controller.delete)
exports.default = router;
