import express, { Router } from 'express';
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, updateUser } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/adminValidation';
import { validateLoginUser, validateSignUpuser } from '../middlewares/userValidation';
import { isIdValid } from '../middlewares/idValidation';
import { autoLoginUser } from '../services/userServices';



const userRoutes: Router = express.Router();

userRoutes.get("/",isAuthenticated,isAdmin, getAllUsers)
// userRoutes.get("/:id",isIdValid,isAuthenticated,isAdmin, getSingleUser)
userRoutes.get("/:id",isAuthenticated,isAdmin,getSingleUser)
userRoutes.post("/auth/register",validateSignUpuser, registerUser)
userRoutes.post("/auth/login",validateLoginUser, loginUser)
userRoutes.post("/auth/verify-token",autoLoginUser)
userRoutes.put("/:id",isAuthenticated,isAdmin,updateUser)
userRoutes.delete("/:id",isAuthenticated,isAdmin, deleteUser)


export default userRoutes