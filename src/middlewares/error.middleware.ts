// This file handles errors in the application. It exports a function that takes an error, request, response, and next function as arguments.
//  The function logs the error message to the console and sends a response with the error message and status code.

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.utils';

// Middleware to handle errors
export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(`[ERROR] ${err.message}`);

  // If the error is an instance of AppError, return the error message and status code
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
}