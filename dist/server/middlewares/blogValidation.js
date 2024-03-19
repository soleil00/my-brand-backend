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
exports.validateUpdateBlog = exports.validateBlog = void 0;
const joi_1 = __importDefault(require("joi"));
const blogSchema = joi_1.default.object({
    title: joi_1.default.string().required().error(new Error('Title is missing')),
    content: joi_1.default.string().required().error(new Error('Content is missing')),
});
function validateBlog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield blogSchema.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            return res.status(400).json({
                message: "Blog validation failed",
                error: error.message
            });
        }
    });
}
exports.validateBlog = validateBlog;
const updateBlogSchema = joi_1.default.object({
    title: joi_1.default.string().optional(),
    content: joi_1.default.string().optional()
});
function validateUpdateBlog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateBlogSchema.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            return res.status(400).json({
                message: "Blog validation failed",
                error: error.message
            });
        }
    });
}
exports.validateUpdateBlog = validateUpdateBlog;
