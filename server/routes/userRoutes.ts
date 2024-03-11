import express, { Router } from 'express';
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, updateUser } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/adminValidation';



const userRoutes: Router = express.Router();

userRoutes.get("/",isAuthenticated,isAdmin, getAllUsers)
userRoutes.get("/:id",isAuthenticated,isAdmin, getSingleUser)
userRoutes.post("/auth/register", registerUser)
userRoutes.post("/auth/login", loginUser)
userRoutes.put("/:id",isAuthenticated,isAdmin,updateUser)
userRoutes.delete("/:id",isAuthenticated,isAdmin, deleteUser)


export default userRoutes