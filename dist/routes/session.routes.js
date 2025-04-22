"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 📁 src/routes/session.routes.ts
const express_1 = require("express");
const session_controller_1 = require("../controllers/session.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const session_schema_1 = require("../types/validators/session.schema");
const router = (0, express_1.Router)();
const controller = new session_controller_1.SessionController();
router.get('/', controller.getAll);
router.post('/', (0, validation_middleware_1.validate)(session_schema_1.CreateSessionSchema), controller.create);
router.delete('/', (0, validation_middleware_1.validate)(session_schema_1.RevokeSessionSchema), controller.revoke);
router.delete('/user/:userId', controller.deleteUserSessions);
exports.default = router;
