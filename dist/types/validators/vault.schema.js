"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVaultSchema = exports.CreateVaultSchema = void 0;
const zod_1 = require("zod");
exports.CreateVaultSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Vault name must be at least 3 characters'),
    owner: zod_1.z.string().min(1, 'Owner ID is required'),
    members: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.UpdateVaultSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).optional(),
    members: zod_1.z.array(zod_1.z.string()).optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
