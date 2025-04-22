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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// 📁 src/services/auth.service.ts
const user_model_1 = require("../models/user.model");
const bcrypt_ts_1 = __importDefault(require("bcrypt-ts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_utils_1 = require("../utils/error.utils");
const session_service_1 = require("./session.service");
const logger_service_1 = require("./logger.service");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class AuthService {
    constructor() {
        this.sessionService = new session_service_1.SessionService();
        this.logger = new logger_service_1.LoggerService();
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield user_model_1.UserModel.findOne({ email: data.email });
            if (existing) {
                throw new error_utils_1.AppError('Email already in use', 400);
            }
            const user = new user_model_1.UserModel(data);
            yield user.save();
            return user;
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email: data.email });
            if (!user) {
                throw new error_utils_1.AppError('Invalid email or password', 401);
            }
            const isMatch = yield bcrypt_ts_1.default.compare(data.password, user.password);
            if (!isMatch) {
                throw new error_utils_1.AppError('Invalid email or password', 401);
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
            yield this.sessionService.create({
                user: user._id.toString(),
                token,
                expiresAt,
            });
            yield this.logger.audit({
                user: user._id.toString(),
                action: 'login_success',
                resourceType: 'User',
                resourceId: user._id.toString(),
            });
            return { token, user: { id: user._id, email: user.email, role: user.role } };
        });
    }
}
exports.AuthService = AuthService;
