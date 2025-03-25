import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.utils';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(`[ERROR] ${err.message}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
}