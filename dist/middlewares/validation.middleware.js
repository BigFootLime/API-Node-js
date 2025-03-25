"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
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
