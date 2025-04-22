// This files is a middleware that validates the request body using a Zod schema.
// It exports a function that takes a Zod schema as an argument and returns a middleware function.

import {Request, Response, NextFunction} from 'express';
import {ZodSchema} from 'zod';

// Middleware to validate request body
// This middleware uses the Zod schema to validate the request body
// If the request body is valid, it calls the next function
export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
        schema.parse(req.body);
        next();
        } catch (error: any) {
        res.status(400).json({error: true,
            message: error.errors?.map((e: any) => e.message).join(', '),});
        }
    };
    }

    export const validateParams = (schema: ZodSchema) => {
        return (req: Request, res: Response, next: NextFunction): void => {
          try {
            schema.parse(req.params)
            next()
          } catch (error: any) {
            res.status(400).json({
              error: true,
              message: error.errors?.map((e: any) => e.message).join(', '),
            })
          }
        }
      }

      export const validateQuery = (schema: ZodSchema) => {
        return (req: Request, res: Response, next: NextFunction): void => {
          try {
            schema.parse(req.query)
            next()
          } catch (error: any) {
            res.status(400).json({
              error: true,
              message: error.errors?.map((e: any) => e.message).join(', '),
            })
          }
        }
      }
        