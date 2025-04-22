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
exports.VaultService = void 0;
// 📁 src/services/vault.service.ts
const vault_model_1 = require("../models/vault.model");
const error_utils_1 = require("../utils/error.utils");
const logger_service_1 = require("./logger.service");
class VaultService {
    constructor() {
        this.logger = new logger_service_1.LoggerService();
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return vault_model_1.VaultModel.find({ isDeleted: false }).populate('owner');
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const vault = yield vault_model_1.VaultModel.findById(id).populate('owner members');
            if (!vault || vault.isDeleted) {
                throw new error_utils_1.NotFoundError(`Vault with id ${id} not found`);
            }
            return vault;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const vault = new vault_model_1.VaultModel(data);
            const result = yield vault.save();
            yield this.logger.audit({
                user: data.owner,
                action: 'vault_created',
                resourceType: 'Vault',
                resourceId: result._id.toString(),
            });
            return result;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield vault_model_1.VaultModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { new: true }).populate('owner');
            if (!updated) {
                throw new error_utils_1.NotFoundError(`Vault with id ${id} not found`);
            }
            return updated;
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield vault_model_1.VaultModel.findByIdAndUpdate(id, {
                isDeleted: true,
                updatedAt: new Date(),
            });
            if (!result) {
                throw new error_utils_1.NotFoundError(`Vault with id ${id} not found`);
            }
            yield this.logger.audit({
                user: userId,
                action: 'vault_deleted',
                resourceType: 'Vault',
                resourceId: id,
            });
            return true;
        });
    }
}
exports.VaultService = VaultService;
