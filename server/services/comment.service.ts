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
            author: currentUser.username,
            blog:id,
        })
        const blog: BlogDocument | null = await Blog.findById(id,{new:true}).populate("comments");

        blog?.comments.push(comment);

        await blog?.save();
        
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}