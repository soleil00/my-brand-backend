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
exports.decodeUserToken = exports.generateUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMode_1 = __importDefault(require("../model/userMode"));
const generateUserToken = (user) => {
    try {
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return token;
    }
    catch (error) {
        console.error("Error generating user token 😒:", error.message);
        throw new Error("Unable to generate user token");
    }
};
exports.generateUserToken = generateUserToken;
const decodeUserToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const associatedUser = yield userMode_1.default.findById(decoded.userId);
        return associatedUser;
    }
    catch (error) {
        console.error("Error decoding user token:", error);
        throw new Error("Invalid token or user not found");
    }
});
exports.decodeUserToken = decodeUserToken;
