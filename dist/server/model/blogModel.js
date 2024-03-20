"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    title: String,
    content: String,
    image: String,
    comments: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Comment'
        }],
    likes: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'User'
        }]
}, {
    timestamps: true
});
const Blog = mongoose_1.default.model('Blog', blogSchema);
exports.default = Blog;
