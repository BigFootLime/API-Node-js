import { z } from 'zod';

export const RegisterUserSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(2),
  surname: z.string().min(2),
  age: z.number().int().min(16), 
  email: z.string().email(),
  password: z.string().min(6),
  phone_number: z.string().optional(),
  departement: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
