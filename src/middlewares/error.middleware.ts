import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.utils';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof AppError ? err.statusCode : 500;
  res.status(status).json({ error: err.message });
}