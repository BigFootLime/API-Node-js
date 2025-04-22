"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokeSessionSchema = exports.CreateSessionSchema = void 0;
// 📁 src/types/session.types.zod.ts
const zod_1 = require("zod");
exports.CreateSessionSchema = zod_1.z.object({
    user: zod_1.z.string().min(1, 'User ID is required'),
    token: zod_1.z.string().min(10, 'Token must be at least 10 characters'),
    expiresAt: zod_1.z.coerce.date(),
});
exports.RevokeSessionSchema = zod_1.z.object({
    token: zod_1.z.string().min(10, 'Token must be at least 10 characters'),
});
