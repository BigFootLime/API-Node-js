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
exports.AuditLogController = void 0;
const auditLog_service_1 = require("../services/auditLog.service");
const service = new auditLog_service_1.AuditLogService();
class AuditLogController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield service.findAll();
            res.status(200).json(logs);
        });
    }
    getByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const logs = yield service.findByUser(userId);
            res.status(200).json(logs);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = yield service.create(req.body);
            res.status(201).json(log);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield service.delete(id);
            res.status(204).send();
        });
    }
}
exports.AuditLogController = AuditLogController;
