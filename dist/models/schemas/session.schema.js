"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
// 📁 src/models/schemas/session.schema.ts
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
}, {
    timestamps: { createdAt: true, updatedAt: false },
});
exports.SessionModel = (0, mongoose_1.model)('Session', sessionSchema);
