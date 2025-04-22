"use strict";
// This files is a middleware that validates the request body using a Zod schema.
// It exports a function that takes a Zod schema as an argument and returns a middleware function.
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = exports.validate = void 0;
// Middleware to validate request body
// This middleware uses the Zod schema to validate the request body
// If the request body is valid, it calls the next function
const validate = (schema) => {
    return (req, res, next) => {
        var _a;
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            res.status(400).json({ error: true,
                message: (_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((e) => e.message).join(', '), });
        }
    };
};
exports.validate = validate;
const validateParams = (schema) => {
    return (req, res, next) => {
        var _a;
        try {
            schema.parse(req.params);
            next();
        }
        catch (error) {
            res.status(400).json({
                error: true,
                message: (_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((e) => e.message).join(', '),
            });
        }
    };
};
exports.validateParams = validateParams;
const validateQuery = (schema) => {
    return (req, res, next) => {
        var _a;
        try {
            schema.parse(req.query);
            next();
        }
        catch (error) {
            res.status(400).json({
                error: true,
                message: (_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((e) => e.message).join(', '),
            });
        }
    };
};
exports.validateQuery = validateQuery;
