"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subscribersModel = new mongoose_1.default.Schema({
    name: String,
    email: String,
}, {
    timestamps: true
});
const Subscriber = mongoose_1.default.model('Subscriber', subscribersModel);
exports.default = Subscriber;
