"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultModel = void 0;
// 📁 src/models/vault.model.ts
const mongoose_1 = require("mongoose");
const vaultSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.VaultModel = (0, mongoose_1.model)('Vault', vaultSchema);
