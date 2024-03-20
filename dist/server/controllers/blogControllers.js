"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentToBlog = exports.deleteAllBlogs = exports.getSingleBlog = exports.deleteBlog = exports.updateSingleBlog = exports.registerBlog = exports.getAllBlogs = void 0;
const blogServices = __importStar(require("../services/blogServices"));
const commentServices = __importStar(require("../services/comment.service"));
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield blogServices.fetchAllBlogs();
        const count = yield blogServices.getBlogCounts();
        if (count > 0) {
            res.status(200).json({
                status: 200,
                count: count,
                data: allBlogs,
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "No blogs found"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});
exports.getAllBlogs = getAllBlogs;
const registerBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogServices.createBlog(req);
        res.status(200).json({
            status: 200,
            message: "Blog added successfully",
            data: blog,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});
exports.registerBlog = registerBlog;
const updateSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogServices.updateBlog(req);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog updated successfully 🦸‍♀️",
            data: blog,
        });
    }
    catch (error) {
        res.status(404).json({
            status: 500,
            message: error.message,
            success: false,
        });
    }
});
exports.updateSingleBlog = updateSingleBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogServices.deleteBlogById(req.params.id);
        res.status(200).json({
            status: 200,
            message: "Blog deleted successfully buddy 🤣",
            success: true
        });
    }
    catch (error) {
        res.status(404).json({
            status: 500,
            message: error.message,
            success: false,
        });
    }
});
exports.deleteBlog = deleteBlog;
const getSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogServices.getBlogById(req.params.id);
        res.status(200).json({
            status: 200,
            success: true,
            data: blog,
        });
    }
    catch (error) {
        res.status(404).json({
            status: 500,
            message: error.message
        });
    }
});
exports.getSingleBlog = getSingleBlog;
const deleteAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield blogServices.deleteAllBlogs();
        if (status.success) {
            res.status(200).json({
                status: 200,
                message: "All blogs deleted successfully",
                count: status.count,
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "No blogs found"
            });
        }
    }
    catch (error) {
        res.status(404).json({
            status: 500,
            message: error.message
        });
    }
});
exports.deleteAllBlogs = deleteAllBlogs;
const addCommentToBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield commentServices.addCommentToBlog(req);
        if (blog) {
            res.status(200).json({
                status: 200,
                message: "Comment added successfully",
                data: blog,
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "No blogs found"
            });
        }
    }
    catch (error) {
        res.status(404).json({
            status: 500,
            message: error.message
        });
    }
});
exports.addCommentToBlog = addCommentToBlog;
