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
exports.addCommentToBlog = void 0;
const blogModel_1 = __importDefault(require("../model/blogModel"));
const commentModel_1 = __importDefault(require("../model/commentModel"));
const addCommentToBlog = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.currentUser;
    const { id } = req.params;
    try {
        const comment = yield commentModel_1.default.create({
            content: req.body.content,
            author: currentUser.username,
            blog: id,
        });
        const blog = yield blogModel_1.default.findById(id).populate("comments");
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    }
    catch (error) {
        throw new Error(`Error while adding comment to blog ${error.message}`);
    }
});
exports.addCommentToBlog = addCommentToBlog;
