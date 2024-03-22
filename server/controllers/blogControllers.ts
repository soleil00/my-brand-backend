import { Request, Response } from "express";
import * as blogServices from "../services/blogServices"
import * as commentServices from "../services/comment.service"
import { BlogDocument } from "../model/blogModel";

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const allBlogs = await blogServices.fetchAllBlogs()
        const count = await blogServices.getBlogCounts()

        if (count> 0) {
            res.status(200).json({
                status: 200,
                count: count,
                data: allBlogs,
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No blogs found"
            })
        }
    } catch (error:any) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const registerBlog = async (req: Request, res: Response) => {
    try {
        const blog: any = await blogServices.createBlog(req)
        
         res.status(200).json({
            status: 200,
            message: "Blog added successfully soleil",
            data: blog,
        })
    } catch (error: any) {
        
        console.log(error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const updateSingleBlog = async (req: Request, res: Response) => { 
    try {
        const blog = await blogServices.updateBlog(req)
        res.status(200).json({
            status: 200,
            success: true,
            message: "Blog updated successfully 🦸‍♀️",
            data: blog,
        })
    } catch (error:any) {
        res.status(404).json({
            status: 500,
            message: error.message,
            success: false,
        })
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blog: any = await blogServices.deleteBlogById(req.params.id)
        res.status(200).json({
            status: 200,
            message: "Blog deleted successfully buddy 🤣",
            success:true
          
        })
    } catch (error:any) {
        res.status(404).json({
            status: 500,
            message: error.message,
            success: false,
        })
    }
}

export const getSingleBlog = async (req: Request, res: Response) => {
    try {
        const blog: any = await blogServices.getBlogById(req.params.id)
        res.status(200).json({
            status: 200,
            success: true,
            data: blog,
        })
    } catch (error:any) {
        res.status(404).json({
            status: 500,
            message: error.message
        })
    }
}

export const deleteAllBlogs = async (req: Request, res: Response) => {
    try {
        const status = await blogServices.deleteAllBlogs()
      
        
        if (status.success) {
            res.status(200).json({
            status: 200,
            message: "All blogs deleted successfully",
            count: status.count,
        })
        } else {
            res.status(404).json({
                status: 404,
                message: "No blogs found"
            })
        }
    } catch (error:any) {
        res.status(404).json({
            status: 500,
            message: error.message
        })
    }
}


export const addCommentToBlog = async (req: Request, res: Response) => {
    try {
        const blog = await commentServices.addCommentToBlog(req)
        
        if (blog) {
            res.status(200).json({
            status: 200,
            message: "Comment added successfully hh",
            data: blog,
        })  
        } 
    } catch (error:any) {
        res.status(404).json({
            status: 404,
            message: error.message
        })
    }
}