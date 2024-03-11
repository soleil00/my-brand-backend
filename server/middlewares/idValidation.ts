import { NextFunction, Request, Response } from "express";


export const isIdValid = (req:Request,res:Response,next:NextFunction)=> {
    const valid = /^[0-9a-fA-F]{24}$/.test(req.params.id);

    if (valid) {
        next();
    } else {
        res.status(400).json({
            status: 400,
            message: "Invalid ID"
        })
    }
}