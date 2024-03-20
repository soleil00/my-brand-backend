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
exports.deleteSubscriber = exports.getAllSubscribers = void 0;
const subscribersModel_1 = __importDefault(require("../model/subscribersModel"));
const getAllSubscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSubs = yield subscribersModel_1.default.find();
        const count = allSubs.length;
        if (count > 0) {
            return res.status(200).json({
                status: 200,
                message: "Subscribers fetched successfully",
                count: count,
                data: allSubs
            });
        }
        else {
            return res.status(404).json({
                message: "No subscribers found 😢"
            });
        }
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});
exports.getAllSubscribers = getAllSubscribers;
const deleteSubscriber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subToDelete = yield subscribersModel_1.default.findById(id);
        if (subToDelete) {
            yield subscribersModel_1.default.findByIdAndDelete(id);
            return res.send(200).json({
                status: 200,
                message: "Subscriber deleted successfully"
            });
        }
        else {
            return res.status(404).json({
                message: "Subscriber not found 😢"
            });
        }
    }
    catch (error) {
        console.log(`error ${error.message}`);
    }
});
exports.deleteSubscriber = deleteSubscriber;
