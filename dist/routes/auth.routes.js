"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const user_schema_1 = require("../types/validators/user.schema");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post('/register', (0, validation_middleware_1.validate)(user_schema_1.RegisterUserSchema), authController.register);
router.post('/login', (0, validation_middleware_1.validate)(user_schema_1.LoginUserSchema), authController.login);
exports.default = router;
