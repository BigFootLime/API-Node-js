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
exports.VaultItemController = void 0;
const vaultItem_service_1 = require("../services/vaultItem.service");
const service = new vaultItem_service_1.VaultItemService();
class VaultItemController {
    constructor() {
        this.getAllItemsForVault = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const vaultId = req.query.vaultId;
            const items = yield service.getItemsByVault(vaultId);
            res.status(200).json(items);
        });
        // async delete(req: Request, res: Response) {
        //   const { id } = req.params
        //   await service.delete(id)
        //   res.status(204).send()
        // }
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield service.findAll();
            res.status(200).json(items);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield service.findById(id);
            res.status(200).json(item);
        });
    }
    getByVault(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vaultId } = req.params;
            const items = yield service.findByVault(vaultId);
            res.status(200).json(items);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield service.create(req.body);
            res.status(201).json(item);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield service.update(id, req.body);
            res.status(200).json(item);
        });
    }
}
exports.VaultItemController = VaultItemController;
