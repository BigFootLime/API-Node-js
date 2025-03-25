// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { RegisterUserSchema, LoginUserSchema } from '../types/validators/user.schema';

const router = Router();
const authController = new AuthController();

router.post('/register', validate(RegisterUserSchema), authController.register);
router.post('/login', validate(LoginUserSchema), authController.login);

export default router;
