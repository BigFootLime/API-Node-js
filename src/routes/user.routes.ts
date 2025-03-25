import { Router } from 'express';
import { register, login } from '../controllers/user.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;

// src/utils/error.util.ts
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}