

import express, { Router } from 'express';
import { addCommentToBlog, deleteAllBlogs, deleteBlog, getAllBlogs, getSingleBlog, registerBlog, updateSingleBlog } from '../controllers/blogControllers';
import uploadService from '../services/multer.service';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isIdValid } from '../middlewares/idValidation';
import { isAdmin } from '../middlewares/adminValidation';
import { validateBlog, validateUpdateBlog } from '../middlewares/blogValidation';
import { validateComment } from '../middlewares/commentValidation';
import { addLikeToBlog } from '../services/like.service';


const blogRoutes: Router = express.Router();


blogRoutes.get("/", getAllBlogs) 
blogRoutes.get("/:id", isIdValid, getSingleBlog)
blogRoutes.delete("/:id",isIdValid,isAuthenticated,isAdmin,deleteBlog)
blogRoutes.post("/",uploadService.single("image"),isAuthenticated,isAdmin,validateBlog, registerBlog)


blogRoutes.put("/:id",uploadService.single("image"),isIdValid,isAuthenticated,isAdmin,validateUpdateBlog, updateSingleBlog)
blogRoutes.delete("/",isAuthenticated,isAdmin, deleteAllBlogs) 
blogRoutes.post("/:id/comments",isIdValid, isAuthenticated, validateComment, addCommentToBlog)
blogRoutes.post("/:id/likes",isIdValid,isAuthenticated,addLikeToBlog)



export default blogRoutes;

