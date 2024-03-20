"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriber_service_1 = require("../services/subscriber.service");
const idValidation_1 = require("../middlewares/idValidation");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const adminValidation_1 = require("../middlewares/adminValidation");
const subscriberRoutes = express_1.default.Router();
subscriberRoutes.get("/", isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, subscriber_service_1.getAllSubscribers);
subscriberRoutes.delete("/:id", idValidation_1.isIdValid, isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, subscriber_service_1.deleteSubscriber);
exports.default = subscriberRoutes;
