import { Request, Response } from "express";
import Blog, { BlogDocument } from "../model/blogModel";
import { UserDocument } from "../model/userMode";

export const addLikeToBlog = async (req: any, res: Response) => {
    const currentUser: UserDocument = req.currentUser;

    try {
        const currentBlog: BlogDocument | null = await Blog.findOne({ _id: req.params.id });

        if (!currentBlog) {
            return res.status(404).json({
                status: 404,
                message: "Blog not found"
            });
        }

        const hasLiked = currentBlog?.likes.some((like: any) => {
            console.log('like:', like); 
            console.log('currentUser._id:', currentUser?._id);
            return like.equals(currentUser?._id);
        });

        let updatedBlog: BlogDocument | null;

        if (hasLiked) {
            updatedBlog = await Blog.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { likes: currentUser._id } },
                { new: true }
            );
        } else {
            updatedBlog = await Blog.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { likes: currentUser._id } },
                { new: true }
            );
        }

        if (!updatedBlog) {
            return res.status(404).json({
                status: 404,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            message: "Successfully added like",
            data: updatedBlog,
            hasLiked
        });
    } catch (error:any) {
        res.status(500).json({
            status: 500,
            message: error.message 
        });
    }
};

