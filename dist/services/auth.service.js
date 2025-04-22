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
const user_model_1 = require("../models/user.model");
const user_model_2 = require("../models/user.model");
const bcrypt_ts_1 = __importDefault(require("bcrypt-ts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Vérifie si l’email existe déjà
            const existing = yield user_model_1.UserModel.findOne({ email: data.email });
            if (existing) {
                throw new Error('Email already in use');
            }
            const newUser = new user_model_1.UserModel(data);
            const saved = yield newUser.save();
            return (0, user_model_2.mapToUser)(saved);
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email: data.email });
            if (!user)
                throw new Error('Invalid credentials');
            const valid = yield bcrypt_ts_1.default.compare(data.password, user.password);
            if (!valid)
                throw new Error('Invalid credentials');
            const payload = {
                sub: user._id,
                email: user.email,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            return token;
        });
    }
}
exports.AuthService = AuthService;
