"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultItemModel = void 0;
// 📁 src/models/vaultItem.model.ts
const mongoose_1 = require("mongoose");
const vaultItemSchema = new mongoose_1.Schema({
    vault: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Vault', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['password', 'note', 'apiKey'], required: true },
    encryptedData: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.VaultItemModel = (0, mongoose_1.model)('VaultItem', vaultItemSchema);
