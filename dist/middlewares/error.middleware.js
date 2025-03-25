"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const error_utils_1 = require("../utils/error.utils");
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.message}`);
    if (err instanceof error_utils_1.AppError) {
        res.status(err.statusCode).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: 'Internal server error' });
    }
}
