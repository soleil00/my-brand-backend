
import Blog, { BlogDocument } from "../model/blogModel";
import { Request } from "express";
import cloudinary from "./cloudinary.service";



export const fetchAllBlogs = async () => {
    try {
        const blogs = await Blog.find()
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



export const createBlog = async (req:any) => {

    try {

        const result = await cloudinary.uploader.upload(req.file.path)

        const blog = await Blog.create({
            ...req.body,
            image:result.secure_url
        })
        return blog;
    } catch (error:any) {
        throw new Error(`error while creating blog : ${error.message}`);
    }
}

export const updateBlog = async (req: any) => {
    try {
        const { id } = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new Error("Invalid blog ID");
        }

        let updatedBlog;
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req?.file?.path)
            updatedBlog = await Blog.findOneAndUpdate(
            { _id: id },
            { ...req.body,image:result.secure_url },
            { new: true }
        )
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

export const deleteBlogById = async (id:string) => {

    try {

         if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new Error("Invalid blog ID");
        }

 
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

         if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new Error("Invalid blog ID");
        }

        const blog = await Blog.findById(id)

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