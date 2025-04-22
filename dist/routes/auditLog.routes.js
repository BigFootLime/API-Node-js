"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 📁 src/routes/auditLog.routes.ts
const express_1 = require("express");
const auditLog_controller_1 = require("../controllers/auditLog.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auditLog_schema_1 = require("../types/validators/auditLog.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const controller = new auditLog_controller_1.AuditLogController();
router.get('/', auth_middleware_1.requireAuth, controller.getAll);
router.get('/user/:userId', auth_middleware_1.requireAuth, controller.getByUser);
router.post('/', auth_middleware_1.requireAuth, (0, validation_middleware_1.validate)(auditLog_schema_1.CreateAuditLogSchema), controller.create);
router.delete('/:id', auth_middleware_1.requireAuth, controller.delete);
exports.default = router;
