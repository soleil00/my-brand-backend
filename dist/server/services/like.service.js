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
exports.addLikeToBlog = void 0;
const blogModel_1 = __importDefault(require("../model/blogModel"));
const addLikeToBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.currentUser;
    try {
        const currentBlog = yield blogModel_1.default.findOne({ _id: req.params.id });
        if (!currentBlog) {
            throw new Error("Blog not found");
        }
        const likedIndex = currentBlog.likes.findIndex(like => like.equals(currentUser._id));
        if (likedIndex !== -1) {
            currentBlog.likes = currentBlog.likes.filter(like => !like.equals(currentUser._id));
        }
        currentBlog.likes.push(currentUser._id);
        yield currentBlog.save();
        res.status(200).json({
            message: "Succesfully added like"
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});
exports.addLikeToBlog = addLikeToBlog;
