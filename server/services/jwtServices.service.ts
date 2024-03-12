import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../model/userMode";

export const generateUserToken = (user: any) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN as string
        });
        return token;
    } catch (error:any) {
        console.error("Error generating user token 😒:", error.message);
        throw new Error("Unable to generate user token");
    }
};

export const decodeUserToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const associatedUser = await User.findById(decoded.userId);
        return associatedUser;
    } catch (error) {
        console.error("Error decoding user token:", error);
        throw new Error("Invalid token or user not found");
    }
};

