

import express, { Router } from 'express';
import { deleteAllBlogs, deleteBlog, getAllBlogs, getSingleBlog, registerBlog, updateSingleBlog } from '../controllers/blogControllers';
import uploadService from '../services/multer.service';


const blogRoutes: Router = express.Router();


blogRoutes.get("/", getAllBlogs)
blogRoutes.get("/:id", getSingleBlog)
blogRoutes.delete("/:id",deleteBlog)
blogRoutes.post("/",uploadService.single("image"), registerBlog)
blogRoutes.put("/:id",uploadService.single("image"), updateSingleBlog)
blogRoutes.delete("/",deleteAllBlogs) 



export default blogRoutes;

