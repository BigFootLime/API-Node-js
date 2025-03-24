"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// inference de type : lorsque le language devine le type d'une variable a partir du type de données qui sert a l'initialisation
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use(express_1.default.json());
// Routes
// Une route : l'association METHOD  http + URL + callback
exports.app.get('/', (req, res) => {
    res.status(200).send('Bienvenue sur mon API Express avec TypeScript ✨');
});
