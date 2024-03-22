import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../model/userMode";
import dotenv from "dotenv"

dotenv.config()
export const generateUserToken = (user: any) => {
    try {
        const token = jwt.sign({ userId: user._id }, "soleilapp_unsensored_secret", {
            expiresIn:"30d"
        });
        return token;
    } catch (error:any) {
        console.error("Error generating user token 😒:", error.message);
        throw new Error("Unable to generate user token");
    }
};

export const decodeUserToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token,"soleilapp_unsensored_secret") as { userId: string };
        const associatedUser = await User.findById(decoded.userId);
        return associatedUser;
    } catch (error) {
        console.error("Error decoding user token:", error);
        throw new Error("Invalid token or user not found");
    }
};

