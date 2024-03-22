import { NextFunction, Response } from "express";

import * as jwtServices from "../services/jwtServices.service"




export const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ error: "Soleil says token is missing 👎" });
    }
    try {
        const user = await jwtServices.decodeUserToken(token)
        if (!user) {
            return res.status(401).json({ error: "Invalid token or user not found" });
        }
        req.currentUser = user; 
        next();
    } catch (error:any) {
        return res.status(401).json({ error: error.message });
    }
};
