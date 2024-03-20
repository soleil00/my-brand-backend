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
exports.validateComment = void 0;
const joi_1 = __importDefault(require("joi"));
const commentSchema = joi_1.default.object({
    content: joi_1.default.string().required().error(new Error("Each comment must have a value")),
    blog: joi_1.default.string().required().error(new Error("Blog id is missing buddy")),
});
function validateComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield commentSchema.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: "Comment validation failed",
                error: error.message
            });
        }
    });
}
exports.validateComment = validateComment;
