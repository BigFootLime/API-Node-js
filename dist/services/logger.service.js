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
exports.LoggerService = void 0;
// 📁 src/services/logger.service.ts
const auditLog_service_1 = require("./auditLog.service");
class LoggerService {
    constructor() {
        this.auditLogService = new auditLog_service_1.AuditLogService();
    }
    audit(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user, action, resourceType, resourceId, ip, userAgent }) {
            yield this.auditLogService.create({
                user,
                action,
                resourceType,
                resourceId,
                ip,
                userAgent,
            });
            console.log(`[AUDIT] User ${user} performed ${action} on ${resourceType} (${resourceId})`);
        });
    }
    info(message) {
        console.log(`[INFO] ${message}`);
    }
    warn(message) {
        console.warn(`[WARN] ${message}`);
    }
    error(message) {
        console.error(`[ERROR] ${message}`);
    }
}
exports.LoggerService = LoggerService;
