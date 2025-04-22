"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuditLogSchema = void 0;
// 📁 src/types/auditLog.types.zod.ts
const zod_1 = require("zod");
exports.CreateAuditLogSchema = zod_1.z.object({
    user: zod_1.z.string().min(1, 'User ID is required'),
    action: zod_1.z.string().min(1, 'Action is required'),
    resourceType: zod_1.z.string().min(1, 'Resource type is required'),
    resourceId: zod_1.z.string().min(1, 'Resource ID is required'),
    ip: zod_1.z.string().optional(),
    userAgent: zod_1.z.string().optional(),
});
