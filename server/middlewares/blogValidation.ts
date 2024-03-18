import { NextFunction, Request, Response } from "express";
import Joi from "joi";


const blogSchema = Joi.object({
    title: Joi.string().required().error(new Error('Title is missing')),
    content: Joi.string().required().error(new Error('Content is missing')),
});

export async function validateBlog(req: Request, res: Response, next: NextFunction) {
    try {
        await blogSchema.validateAsync(req.body, { abortEarly: false })
        return next()
    } catch (error:any) {
        return res.status(400).json({
            message: "Blog validation failed",
            error: error.message
        })
    }
}


const updateBlogSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional()
})


export async function validateUpdateBlog(req: Request, res: Response, next: NextFunction) {
    try {
        await updateBlogSchema.validateAsync(req.body, { abortEarly: false })
        return next()
    } catch (error:any) {
        return res.status(400).json({
            message: "Blog validation failed",
            error: error.message
        })
    }
}


