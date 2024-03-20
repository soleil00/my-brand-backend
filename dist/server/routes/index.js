"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
const subscribersRoutes_1 = __importDefault(require("./subscribersRoutes"));
const appRoutes = express_1.default.Router();
appRoutes.use("/users", userRoutes_1.default);
appRoutes.use("/blogs", blogRoutes_1.default);
appRoutes.use("/messages", messageRoutes_1.default);
appRoutes.use("/subscribers", subscribersRoutes_1.default);
exports.default = appRoutes;
