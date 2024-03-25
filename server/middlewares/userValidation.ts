import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().required().error(new Error("Username must be provided")),
    password: Joi.string().required().error(new Error("Password must be provided")),
    email: Joi.string().required().error(new Error("Email must be provided")),
    isAdmin: Joi.boolean().optional()
})


export async function validateSignUpuser(req: Request, res: Response, next: NextFunction) {
    try {
        await userSchema.validateAsync(req.body, { abortEarly: false })
        return next()
    } catch (error:any) {
        return res.status(400).json({
            status: 400,
            message: "User validation failed",
            error: error.message
        })
    }
}

const loginUserSchema = Joi.object({
    email: Joi.string().required().error(new Error("Username or email must be provided")),
    password: Joi.string().required().error(new Error("Password must be provided"))
})


export async function validateLoginUser(req: Request, res: Response, next: NextFunction) {
    try {
        await loginUserSchema.validateAsync(req.body, { abortEarly: false })
        return next()
    } catch (error:any) {
        return res.status(400).json({
            status: 400,
            message: "User validation failed",
            error: error.message
        })
    }
}


