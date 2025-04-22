"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 📁 src/routes/vault.routes.ts
const express_1 = require("express");
const vault_controller_1 = require("../controllers/vault.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const vault_schema_1 = require("../types/validators/vault.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const controller = new vault_controller_1.VaultController();
router.get('/', auth_middleware_1.requireAuth, controller.getAll);
router.get('/:id', auth_middleware_1.requireAuth, controller.getById);
router.post('/', auth_middleware_1.requireAuth, (0, validation_middleware_1.validate)(vault_schema_1.CreateVaultSchema), controller.create);
router.put('/:id', auth_middleware_1.requireAuth, (0, validation_middleware_1.validate)(vault_schema_1.UpdateVaultSchema), controller.update);
// router.delete('/:id', requireAuth, controller.delete)
exports.default = router;
