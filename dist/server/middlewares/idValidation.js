"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdValid = void 0;
const isIdValid = (req, res, next) => {
    const valid = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    if (valid) {
        next();
    }
    else {
        res.status(400).json({
            status: 400,
            message: "Invalid ID"
        });
    }
};
exports.isIdValid = isIdValid;
