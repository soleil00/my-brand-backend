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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.updateUser = exports.deleteUser = exports.getSingleUser = exports.registerUser = exports.getAllUsers = void 0;
const userService = __importStar(require("../services/userServices"));
const jwtService = __importStar(require("../services/jwtServices.service"));
const userMode_1 = __importDefault(require("../model/userMode"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        if (users.length > 0) {
            const userCount = yield userService.getUsersCount();
            return res.status(200).json({
                count: userCount,
                status: 200,
                message: "Users fetched successfully",
                data: users
            });
        }
        return res.status(404).json({
            message: "No users found"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
exports.getAllUsers = getAllUsers;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield userMode_1.default.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({
                status: 400,
                message: "Email already exists"
            });
        }
        const user = yield userService.createUser(req);
        return res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
exports.registerUser = registerUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getSingleUser(req.params.id);
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "User found",
                data: user
            });
        }
        return res.status(404).json({
            message: "User not found"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: "sorry"
        });
    }
});
exports.getSingleUser = getSingleUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.deleteUser(req.params.id);
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "User deleted successfully",
                data: user
            });
        }
        return res.status(404).json({
            message: "User not found"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.updateUser(req);
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "User updated successfully",
                data: user
            });
        }
        return res.status(404).json({
            message: "User not found"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.updateUser = updateUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.loginUser(req);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isPasswordMatch = user.password === req.body.password;
        if (user && isPasswordMatch) {
            const token = jwtService.generateUserToken(user);
            return res.status(200).json({
                status: 200,
                message: "User logged in successfully",
                data: user,
                token: token
            });
        }
        else {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.loginUser = loginUser;
