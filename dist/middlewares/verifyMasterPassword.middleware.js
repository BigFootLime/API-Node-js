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
exports.verifyMasterPassword = void 0;
const vault_service_1 = require("../services/vault.service");
const vaultService = new vault_service_1.VaultService();
const verifyMasterPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vaultId, password } = req.body || req.query;
        if (!vaultId || !password) {
            res.status(400).json({ message: 'Vault ID and master password are required.' });
            return;
        }
        const result = yield vaultService.verifyVaultPassword(vaultId, password);
        if (!result.success) {
            res.status(401).json({ message: 'Invalid master password.' });
            return;
        }
        // ✅ valid, continue
        next();
    }
    catch (error) {
        console.error('🔒 verifyMasterPassword middleware error:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
        return;
    }
});
exports.verifyMasterPassword = verifyMasterPassword;
