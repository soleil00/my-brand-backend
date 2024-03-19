"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const adminValidation_1 = require("../middlewares/adminValidation");
const userValidation_1 = require("../middlewares/userValidation");
const userRoutes = express_1.default.Router();
userRoutes.get("/", isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, userController_1.getAllUsers);
userRoutes.get("/:id", isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, userController_1.getSingleUser);
userRoutes.post("/auth/register", userValidation_1.validateSignUpuser, userController_1.registerUser);
userRoutes.post("/auth/login", userValidation_1.validateLoginUser, userController_1.loginUser);
userRoutes.put("/:id", isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, userController_1.updateUser);
userRoutes.delete("/:id", isAuthenticated_1.isAuthenticated, adminValidation_1.isAdmin, userController_1.deleteUser);
exports.default = userRoutes;
