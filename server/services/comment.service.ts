import { Request } from "express";
import Blog, { BlogDocument } from "../model/blogModel";
import Comment from "../model/commentModel";
import { UserDocument } from "../model/userMode";

export const addCommentToBlog = async (req: any) => {

    const currentUser : UserDocument = req.currentUser

    const {id} = req.params

    try {
 
        const comment = await Comment.create({
            content: req.body.content,
            author: currentUser.username
        })

        const blog: BlogDocument | null = await Blog.findById(id);
        
        if (!blog) {
            throw new Error("Blog not found");
        }

        blog.comments.push(comment);
        
        await blog.save();

        return blog;
    } catch (error: any) {
        throw new Error(`Error while adding comment to blog ${error.message}`);
    }
}