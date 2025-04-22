"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVaultItemSchema = exports.CreateVaultItemSchema = void 0;
// 📁 src/types/vaultItem.types.zod.ts
const zod_1 = require("zod");
exports.CreateVaultItemSchema = zod_1.z.object({
    vault: zod_1.z.string().min(1, 'Vault ID is required'),
    title: zod_1.z.string().min(1, 'Title is required'),
    type: zod_1.z.enum(['password', 'note', 'apiKey']),
    encryptedData: zod_1.z.string().min(1, 'Encrypted content is required'),
    createdBy: zod_1.z.string().min(1, 'Creator ID is required'),
});
exports.UpdateVaultItemSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    encryptedData: zod_1.z.string().min(1).optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
