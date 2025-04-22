"use strict";
// Purpose: Validation schema for todo.
// As you can see, the snippet is a validation schema for todo.
//  It is used to validate the request body when creating or updating a todo.
//  The schema uses the zod library to define the shape of the data and validate it
//  against the specified constraints.
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoSchema = exports.CreateTodoSchema = void 0;
const zod_1 = require("zod");
const todo_model_1 = require("../../models/todo.model");
// Validation schema for creating a todo
exports.CreateTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'The title must be at least 3 characters ! ').max(50, 'The title must be at most 50 characters ! '),
    description: zod_1.z.string().max(200, 'The description must be at most 200 characters ! ').optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z.nativeEnum(todo_model_1.Priority),
});
exports.UpdateTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'The title must be at least 3 characters ! ').max(50, 'The title must be at most 50 characters ! ').optional(),
    description: zod_1.z.string().max(200, 'The description must be at most 200 characters ! ').optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z.nativeEnum(todo_model_1.Priority).optional(),
    completed: zod_1.z.boolean().optional(),
});
