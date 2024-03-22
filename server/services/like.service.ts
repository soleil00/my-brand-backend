import { Request, Response } from "express";
import Blog, { BlogDocument } from "../model/blogModel";
import { UserDocument } from "../model/userMode";

export const addLikeToBlog = async (req: any, res: Response) => {
    const currentUser: UserDocument = req.currentUser;

    try {
        const currentBlog: BlogDocument | null = await Blog.findOne({ _id: req.params.id });
        if (!currentBlog) {
            res.status(404).json({
                status: 404,
                message: "Blog not found"
            })
        }


        const hasLiked = currentBlog?.likes.some(like => like.equals(currentUser._id));

        if (hasLiked) {
            
            await Blog.updateOne({ _id: req.params.id }, { $pull: { likes: currentUser._id } });
        } else {
            
            await Blog.updateOne({ _id: req.params.id }, { $push: { likes: currentUser._id } });
        }

        
        const updatedBlog: BlogDocument | null = await Blog.findOne({ _id: req.params.id });

        res.status(200).json({
            message: "Successfully toggled like",
            data: updatedBlog
        });
    } catch (error:any) {
        res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error"
        });
    }
};
