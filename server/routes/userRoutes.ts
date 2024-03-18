import express, { Router } from 'express';
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, updateUser } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/adminValidation';
import { validateLoginUser, validateSignUpuser } from '../middlewares/userValidation';



const userRoutes: Router = express.Router();

userRoutes.get("/",isAuthenticated,isAdmin, getAllUsers)
userRoutes.get("/:id",isAuthenticated,isAdmin, getSingleUser)
userRoutes.post("/auth/register",validateSignUpuser, registerUser)
userRoutes.post("/auth/login",validateLoginUser, loginUser)
userRoutes.put("/:id",isAuthenticated,isAdmin,updateUser)
userRoutes.delete("/:id",isAuthenticated,isAdmin, deleteUser)


export default userRoutes