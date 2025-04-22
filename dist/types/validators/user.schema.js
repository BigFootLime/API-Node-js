"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserSchema = exports.RegisterUserSchema = void 0;
const zod_1 = require("zod");
exports.RegisterUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    name: zod_1.z.string().min(2),
    surname: zod_1.z.string().min(2),
    age: zod_1.z.number().int().min(16),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    phone_number: zod_1.z.string().optional(),
    departement: zod_1.z.string().optional(),
    role: zod_1.z.enum(['user', 'admin']).optional(),
});
exports.LoginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
