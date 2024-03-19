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
exports.deleteAllBlogs = exports.getBlogById = exports.deleteBlogById = exports.updateBlog = exports.createBlog = exports.getBlogCounts = exports.fetchAllBlogs = void 0;
const blogModel_1 = __importDefault(require("../model/blogModel"));
const cloudinary_service_1 = __importDefault(require("./cloudinary.service"));
const fetchAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModel_1.default.find().populate("comments");
        return blogs;
    }
    catch (error) {
    }
});
exports.fetchAllBlogs = fetchAllBlogs;
const getBlogCounts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogCounts = yield blogModel_1.default.countDocuments();
        return blogCounts;
    }
    catch (error) {
        throw new Error(`error while fetching blog count : ${error.message}`);
    }
});
exports.getBlogCounts = getBlogCounts;
const createBlog = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.currentUser;
    try {
        if (currentUser.isAdmin) {
            const result = yield cloudinary_service_1.default.uploader.upload(req.file.path);
            const blog = yield blogModel_1.default.create(Object.assign(Object.assign({}, req.body), { image: result.secure_url }));
            return blog;
        }
        else {
            throw new Error("You are not authorized to perform this action");
        }
    }
    catch (error) {
        console.log(` ${error.message}`);
        return;
    }
});
exports.createBlog = createBlog;
const updateBlog = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const currentUser = req.currentUser;
    try {
        const { id } = req.params;
        let updatedBlog;
        if (req.file) {
            const result = yield cloudinary_service_1.default.uploader.upload((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path);
            updatedBlog = yield blogModel_1.default.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, req.body), { image: result.secure_url }), { new: true }).populate("comments");
        }
        else {
            updatedBlog = yield blogModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body), { new: true });
        }
        if (!updatedBlog) {
            throw new Error("Blog not found");
        }
        return updatedBlog;
    }
    catch (error) {
        throw new Error(`Error updating blog: ${error.message}`);
    }
});
exports.updateBlog = updateBlog;
const deleteBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogModel_1.default.findByIdAndDelete(id);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    }
    catch (error) {
        throw new Error(`${error.message}`);
    }
});
exports.deleteBlogById = deleteBlogById;
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogModel_1.default.findById(id).populate("comments");
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    }
    catch (error) {
        throw new Error(` ${error.message}`);
    }
});
exports.getBlogById = getBlogById;
const deleteAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModel_1.default.deleteMany();
        const count = blogs.deletedCount;
        return {
            success: true,
            count: count
        };
    }
    catch (error) {
        throw new Error(`${error.message}`);
    }
});
exports.deleteAllBlogs = deleteAllBlogs;
