import { Request, Response } from "express";
import Blog, { BlogDocument } from "../model/blogModel";
import { UserDocument } from "../model/userMode";

export const addLikeToBlog = async (req: any,res:Response) => {
    const currentUser: UserDocument = req.currentUser;

    try {
        const currentBlog: BlogDocument | null = await Blog.findOne({ _id: req.params.id });
        if (!currentBlog) {
            throw new Error("Blog not found");
        }

        const likedIndex = currentBlog.likes.findIndex(like => like.equals(currentUser._id));
        if (likedIndex !== -1) {

            currentBlog.likes = currentBlog.likes.filter(like => !like.equals(currentUser._id));
        }

  
        currentBlog.likes.push(currentUser._id);
        await currentBlog.save();

        res.status(200).json({
            message:"Succesfully added like"
        })
    } catch (error:any) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}
