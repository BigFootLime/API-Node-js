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
exports.SessionService = void 0;
// 📁 src/services/session.service.ts
const session_model_1 = require("../models/session.model");
const error_utils_1 = require("../utils/error.utils");
class SessionService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return session_model_1.SessionModel.find().populate('user');
        });
    }
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield session_model_1.SessionModel.findOne({ token });
            if (!session) {
                throw new error_utils_1.NotFoundError(`Session with token ${token} not found`);
            }
            return session;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = new session_model_1.SessionModel(data);
            return session.save();
        });
    }
    deleteByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield session_model_1.SessionModel.findOneAndDelete({ token });
            if (!result) {
                throw new error_utils_1.NotFoundError(`Session with token ${token} not found`);
            }
            return true;
        });
    }
    deleteByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield session_model_1.SessionModel.deleteMany({ user: userId });
            return result.deletedCount || 0;
        });
    }
}
exports.SessionService = SessionService;
