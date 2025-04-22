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
exports.VaultController = void 0;
const vault_service_1 = require("../services/vault.service");
const vaultService = new vault_service_1.VaultService();
class VaultController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vaults = yield vaultService.findAll();
            res.status(200).json(vaults);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const vault = yield vaultService.findById(id);
            res.status(200).json(vault);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vault = yield vaultService.create(req.body);
            res.status(201).json(vault);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const vault = yield vaultService.update(id, req.body);
            res.status(200).json(vault);
        });
    }
}
exports.VaultController = VaultController;
