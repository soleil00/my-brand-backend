import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { join } from "path";



const commentSchema = Joi.object({
    content: Joi.string().required().error(new Error("Each comment must have a value")),
})


export async function validateComment(req: Request, res: Response, next: NextFunction) {
    try {
        await commentSchema.validateAsync(req.body, { abortEarly: false })
        
        return next()
    } catch (error:any) {
        res.status(400).json({
            status: 400,
            message: "Comment validation failed",
            error: error.message
        })
    }
}