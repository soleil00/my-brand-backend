import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../model/userMode";
import dotenv from "dotenv";

dotenv.config();

export const generateUserToken = (user: any) => {
    try {
        const token = jwt.sign({ userId: user._id }, "hard-coded-token", {
            expiresIn: "30d"
        });
        return token;
    } catch (error) {
        console.error("Error generating user token:", error);
        throw new Error("Unable to generate user token");
    }
};

export const decodeUserToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, "hard-coded-token") as { userId: string };
        if (!decoded.userId) {
            throw new Error("Invalid token: Missing user ID");
        }
        const associatedUser = await User.findById(decoded.userId);
        if (!associatedUser) {
            throw new Error("User not found");
        }
        return associatedUser;
    } catch (error) {
        console.error("Error decoding user token:", error);
        throw new Error("Invalid token or user not found");
    }
};
