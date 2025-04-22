"use strict";
// Desc: Entry point for the server
// Importing the app from the config folder and starting the server
// Also connecting to the database
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./config/app");
const db_1 = require("./config/db");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)().then(() => {
    app_1.app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('❌ Error starting server:', err);
});
