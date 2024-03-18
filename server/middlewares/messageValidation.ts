import { NextFunction, Request, Response } from "express";
import Joi from "joi";


const messageSchame = Joi.object({
    name: Joi.string().required().error(new Error("Name is Missing in request")),
    subject: Joi.string().required().error(new Error("subject is Missing in request")),
    email: Joi.string().required().error(new Error("email is Missing in request")),
    message: Joi.string().required().error(new Error("message is Missing in request")),
    subscribed: Joi.boolean().default(false)
})


export async function validateMessage(req: Request, res: Response, next: NextFunction) {
    try {
        await messageSchame.validateAsync(req.body, { abortEarly: false })
        return next()
    } catch (error:any) {
         return res.status(400).json({
            status: 400,
            message: "Message validation failed",
            error: error.message
        })
    }
}