"use strict";
// This file is used to configure the express application
// It imports the express module and the todoRoutes
// It also configures the middlewares and the routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//Importation des modules
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// Routes
const todo_routes_1 = __importDefault(require("../routes/todo.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
// inference de type : lorsque le language devine le type d'une variable a partir du type de données qui sert a l'initialisation
exports.app = (0, express_1.default)();
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../docs/swagger");
// Middlewares
// Sécurité avec helmet
exports.app.use((0, helmet_1.default)());
//Partage des ressources (cors)
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use('/api/auth', auth_routes_1.default);
exports.app.use('/api/todos', todo_routes_1.default);
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
exports.app.use(error_middleware_1.default);
// Routes
// Une route : l'association METHOD  http + URL + callback
exports.app.get('/', (req, res) => {
    res.status(200).json('Bienvenue sur mon API Express avec TypeScript ✨');
});
exports.app.get('/api-docs-json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.swaggerSpec);
});
