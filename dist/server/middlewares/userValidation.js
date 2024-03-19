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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginUser = exports.validateSignUpuser = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    username: joi_1.default.string().required().error(new Error("Username must be provided")),
    password: joi_1.default.string().required().error(new Error("Password must be provided")),
    email: joi_1.default.string().required().error(new Error("Email must be provided"))
});
function validateSignUpuser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield userSchema.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            return res.status(400).json({
                status: 400,
                message: "User validation failed",
                error: error.message
            });
        }
    });
}
exports.validateSignUpuser = validateSignUpuser;
const loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().required().error(new Error("Username or email must be provided")),
    password: joi_1.default.string().required().error(new Error("Password must be provided"))
});
function validateLoginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield loginUserSchema.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            return res.status(400).json({
                status: 400,
                message: "User validation failed",
                error: error.message
            });
        }
    });
}
exports.validateLoginUser = validateLoginUser;
