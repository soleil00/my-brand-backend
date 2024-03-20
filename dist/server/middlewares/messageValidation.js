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
exports.validateMessage = void 0;
const joi_1 = __importDefault(require("joi"));
const messageSchame = joi_1.default.object({
    name: joi_1.default.string().required().error(new Error("Name is Missing in request")),
    subject: joi_1.default.string().required().error(new Error("subject is Missing in request")),
    email: joi_1.default.string().required().error(new Error("email is Missing in request")),
    message: joi_1.default.string().required().error(new Error("message is Missing in request")),
    subscribed: joi_1.default.boolean().default(false)
});
function validateMessage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield messageSchame.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            return res.status(400).json({
                status: 400,
                message: "Message validation failed",
                error: error.message
            });
        }
    });
}
exports.validateMessage = validateMessage;
