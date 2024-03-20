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
exports.deleteMessage = exports.getAllMessages = exports.userSendMessage = void 0;
const messageService = __importStar(require("../services/message.service"));
const userSendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = messageService.sendMessage(req, res);
        return response;
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.userSendMessage = userSendMessage;
// export const getSingleMessage = async (req: Request, res: Response) => {
// }
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield messageService.getAllMessages(req, res);
        return response;
    }
    catch (error) {
    }
});
exports.getAllMessages = getAllMessages;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield messageService.deleteMessage(req, res);
        return response;
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.deleteMessage = deleteMessage;
