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
exports.loginUser = exports.getSingleUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsersCount = exports.getAllUsers = void 0;
const userMode_1 = __importDefault(require("../model/userMode"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = await User.find();
        const users = yield userMode_1.default.find({ username: { $exists: true } });
        return users;
    }
    catch (error) {
        throw new Error(`Error happened while fetching all users: ${error.message}`);
    }
});
exports.getAllUsers = getAllUsers;
const getUsersCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield userMode_1.default.countDocuments({ username: { $exists: true } });
        return count;
    }
    catch (error) {
        throw new Error(`Error happened while getting user counts ${error.message}`);
    }
});
exports.getUsersCount = getUsersCount;
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userMode_1.default.create(req.body);
        return user;
    }
    catch (error) {
        throw new Error(`Error while creating user ${error.message}`);
    }
});
exports.createUser = createUser;
const updateUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userMode_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return user;
    }
    catch (error) {
        throw new Error(`Error while updating user ---> ${error.message}`);
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userMode_1.default.findByIdAndDelete(id);
        return user;
    }
    catch (error) {
        throw new Error(`Error while deleting user ---> ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userMode_1.default.findById(id);
        if (user) {
            return user;
        }
        else {
            throw new Error("User not found");
        }
    }
    catch (error) {
        throw new Error(`Error while getting single user ---> ${error.message}`);
    }
});
exports.getSingleUser = getSingleUser;
const loginUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userMode_1.default.findOne({ $or: [{ email }, { username: email }] });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        console.log(`${error.message}`);
        return;
    }
});
exports.loginUser = loginUser;
