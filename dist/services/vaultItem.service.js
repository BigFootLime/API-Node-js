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
exports.VaultItemService = void 0;
// 📁 src/services/vaultItem.service.ts
const vaultItem_model_1 = require("../models/vaultItem.model");
const error_utils_1 = require("../utils/error.utils");
const logger_service_1 = require("./logger.service");
class VaultItemService {
    constructor() {
        this.logger = new logger_service_1.LoggerService();
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return vaultItem_model_1.VaultItemModel.find({ isDeleted: false }).populate('vault createdBy');
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield vaultItem_model_1.VaultItemModel.findById(id).populate('vault createdBy');
            if (!item || item.isDeleted) {
                throw new error_utils_1.NotFoundError(`Vault item with id ${id} not found`);
            }
            return item;
        });
    }
    findByVault(vaultId) {
        return __awaiter(this, void 0, void 0, function* () {
            return vaultItem_model_1.VaultItemModel.find({ vault: vaultId, isDeleted: false }).populate('createdBy');
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new vaultItem_model_1.VaultItemModel(data);
            const result = yield item.save();
            yield this.logger.audit({
                user: data.createdBy,
                action: 'vault_item_created',
                resourceType: 'VaultItem',
                resourceId: result._id.toString(),
            });
            return result;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield vaultItem_model_1.VaultItemModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { new: true }).populate('vault createdBy');
            if (!updated) {
                throw new error_utils_1.NotFoundError(`Vault item with id ${id} not found`);
            }
            return updated;
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield vaultItem_model_1.VaultItemModel.findByIdAndUpdate(id, {
                isDeleted: true,
                updatedAt: new Date(),
            });
            if (!result) {
                throw new error_utils_1.NotFoundError(`Vault item with id ${id} not found`);
            }
            yield this.logger.audit({
                user: userId,
                action: 'vault_item_deleted',
                resourceType: 'VaultItem',
                resourceId: id,
            });
            return true;
        });
    }
    getItemsByVault(vaultId) {
        return __awaiter(this, void 0, void 0, function* () {
            return vaultItem_model_1.VaultItemModel.find({ vault: vaultId }).lean();
        });
    }
}
exports.VaultItemService = VaultItemService;
