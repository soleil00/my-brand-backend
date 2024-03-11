import { NextFunction, Request, Response } from "express";



export const isMessageValidated = async (req: Request, res: Response, next: NextFunction) => {
    
    const { message, name, subject, email } = req.body;
    
    try {
        if (!message) {
            return res.status(400).json({
                status: 400,
                message: "Message is required"
            });
        } else if (!name) {
            return res.status(400).json({
                status: 400,
                message: "Name is required"
            });
        } else if (!subject) {
            return res.status(400).json({
                status: 400,
                message: "Subject is required"
            });
        } else if (!email) {
            return res.status(400).json({
                status: 400,
                message: "Email is required"
            });
        }

        return next();
    } catch (error:any) {
        console.log(`error happened: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
    
}


