"use strict";
// This file handles errors in the application. It exports a function that takes an error, request, response, and next function as arguments.
//  The function logs the error message to the console and sends a response with the error message and status code.
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const error_utils_1 = require("../utils/error.utils");
// Middleware to handle errors
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.message}`);
    // If the error is an instance of AppError, return the error message and status code
    if (err instanceof error_utils_1.AppError) {
        res.status(err.statusCode).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: 'Internal server error' });
    }
}
