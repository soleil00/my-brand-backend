"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = require("../controllers/messagesController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const adminValidation_1 = require("../middlewares/adminValidation");
const idValidation_1 = require("../middlewares/idValidation");
const messageValidation_1 = require("../middlewares/messageValidation");
const messageRoute = express_1.default.Router();
messageRoute.get("/", isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, messagesController_1.getAllMessages);
messageRoute.post("/", messageValidation_1.validateMessage, messagesController_1.userSendMessage);
messageRoute.delete("/:id", idValidation_1.isIdValid, isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, messagesController_1.deleteMessage);
exports.default = messageRoute;
