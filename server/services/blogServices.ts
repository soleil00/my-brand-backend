
import Blog, { BlogDocument } from "../model/blogModel";
import { Request } from "express";
import cloudinary from "./cloudinary.service";
import { UserDocument } from "../model/userMode";



export const fetchAllBlogs = async () => {
    try {
        const blogs = await Blog.find().populate("comments")
        return blogs;
    } catch (error) {
        
    }
}

export const getBlogCounts = async () => {
    try {
        const blogCounts = await Blog.countDocuments();
        return blogCounts;
    } catch (error:any) {
        throw new Error(`error while fetching blog count : ${error.message}`);
    }
}



export const createBlog = async (req: any) => {
    
    const currentUser : UserDocument = req.currentUser;

    try {
        let blog;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            blog = await Blog.create({
                ...req.body,
                image: result.secure_url
            });
        } else {
            blog = await Blog.create({
                ...req.body
            });
        }

        return blog;
      
    } catch (error:any) {
        console.log(`Error creating blog: ${error.message}`);
        return null; // Return null to indicate failure
    }
};

export const updateBlog = async (req: any) => {

    const currentUser : UserDocument = req.currentUser;
    try {
        const { id } = req.params;

        let updatedBlog;
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req?.file?.path)
            updatedBlog = await Blog.findOneAndUpdate(
            { _id: id },
            { ...req.body,image:result.secure_url },
            { new: true }
        ).populate("comments")
        } else {
             updatedBlog = await Blog.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        }

        if (!updatedBlog) {
            throw new Error("Blog not found");
        }

        return updatedBlog;
    } catch (error:any) {
        throw new Error(`Error updating blog: ${error.message}`);
    }
};

export const deleteBlogById = async (id: string) => {
    

    try {

        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    } catch (error:any) {
        throw new Error(`${error.message}`);
    }
}

export const getBlogById = async (id: string) => {
    try {


        const blog = await Blog.findById(id).populate("comments")

        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    } catch (error:any) {
        throw new Error(` ${error.message}`);
    }
}

export const deleteAllBlogs = async ()=>{
    try {
        const blogs = await Blog.deleteMany();
        const count  = blogs.deletedCount
        return {
            success: true,
            count: count
        }
    } catch (error:any) {
        throw new Error(`${error.message}`);
    }
}