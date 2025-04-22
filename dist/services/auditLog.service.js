"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogService = void 0;
const auditLog_model_1 = require("../models/auditLog.model");
const error_utils_1 = require("../utils/error.utils");
class AuditLogService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return auditLog_model_1.AuditLogModel.find().populate('user');
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return auditLog_model_1.AuditLogModel.find({ user: userId }).populate('user');
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = new auditLog_model_1.AuditLogModel(data);
            return log.save();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield auditLog_model_1.AuditLogModel.findByIdAndDelete(id);
            if (!result)
                throw new error_utils_1.NotFoundError(`Log with id ${id} not found`);
            return true;
        });
    }
}
exports.AuditLogService = AuditLogService;
