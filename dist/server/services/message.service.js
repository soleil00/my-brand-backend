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
exports.deleteMessage = exports.getMessageById = exports.getAllMessages = exports.getMessageCount = exports.sendMessage = void 0;
const messageModel_1 = __importDefault(require("../model/messageModel"));
const subscribersModel_1 = __importDefault(require("../model/subscribersModel"));
const email_service_1 = __importDefault(require("./email.service"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMessage = yield messageModel_1.default.create(Object.assign({}, req.body));
        if (req.body.subscribed) {
            const newSub = yield subscribersModel_1.default.create({
                email: req.body.email,
                name: req.body.name
            });
            yield (0, email_service_1.default)(req.body.email, req.body.name);
        }
        return res.status(200).json({
            status: 200,
            message: "Message sent successfully",
            data: newMessage
        });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});
exports.sendMessage = sendMessage;
const getMessageCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageCount = yield messageModel_1.default.countDocuments();
        return messageCount;
    }
    catch (error) {
        console.log(`Error: ${error.messsage}`);
    }
});
exports.getMessageCount = getMessageCount;
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMessages = yield messageModel_1.default.find();
        const count = allMessages.length;
        if (count > 0) {
            return res.status(200).json({
                status: 200,
                message: "All message retived",
                count: count,
                data: allMessages
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "No message found"
            });
        }
    }
    catch (error) {
        res.send(500).json({
            status: 500,
            message: error.message
        });
    }
});
exports.getAllMessages = getAllMessages;
const getMessageById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const singleMessage = yield messageModel_1.default.findById(id);
        if (singleMessage) {
            return singleMessage;
        }
        else {
            throw new Error("Message not found");
            return;
        }
    }
    catch (error) {
        console.log(`Error getting message ${error.message}`);
        return;
    }
});
exports.getMessageById = getMessageById;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageToDelete = yield messageModel_1.default.findById(req.params.id);
        if (messageToDelete) {
            yield messageModel_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                status: 200,
                message: "Message deleted successfully 🍭"
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "Message not found 🔬"
            });
        }
    }
    catch (error) {
        console.log(`Error deleting message ${error.message}`);
        return;
    }
});
exports.deleteMessage = deleteMessage;
