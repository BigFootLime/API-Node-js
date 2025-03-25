import {coerce, z} from 'zod';
import { Priority } from '../../models/todo.model';

export const CreateTodoSchema = z.object({
    title: z.string().min(3, 'The title must be at least 3 characters ! ').max(50, 'The title must be at most 50 characters ! '),
    description: z.string().max(200, 'The description must be at most 200 characters ! ').optional(),
    dueDate: z.coerce.date().optional(),
    priority: z.nativeEnum(Priority),
});

export const UpdateTodoSchema = z.object({
    title: z.string().min(3, 'The title must be at least 3 characters ! ').max(50, 'The title must be at most 50 characters ! ').optional(),
    description: z.string().max(200, 'The description must be at most 200 characters ! ').optional(),
    dueDate: z.coerce.date().optional(),
    priority: z.nativeEnum(Priority).optional(),
    completed: z.boolean().optional(),
});
