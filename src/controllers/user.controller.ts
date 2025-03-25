import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import { RegisterDTO, LoginDTO } from '../types/user.types';

export const register = async (req: Request<{}, {}, RegisterDTO>, res: Response, next: NextFunction) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request<{}, {}, LoginDTO>, res: Response, next: NextFunction) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
