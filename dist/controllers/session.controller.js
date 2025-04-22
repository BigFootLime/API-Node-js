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
exports.SessionController = void 0;
const session_service_1 = require("../services/session.service");
const sessionService = new session_service_1.SessionService();
class SessionController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = yield sessionService.findAll();
            res.status(200).json(sessions);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield sessionService.create(req.body);
            res.status(201).json(session);
        });
    }
    revoke(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            yield sessionService.deleteByToken(token);
            res.status(204).send();
        });
    }
    deleteUserSessions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const count = yield sessionService.deleteByUser(userId);
            res.status(200).json({ deleted: count });
        });
    }
}
exports.SessionController = SessionController;
