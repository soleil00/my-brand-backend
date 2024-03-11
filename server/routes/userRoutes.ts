import express, { Router } from 'express';
import { deleteUser, getAllUsers, getSingleUser, registerUser, updateUser } from '../controllers/userController';

const router: Router = express.Router();

router.get("/", getAllUsers)
router.get("/:id", getSingleUser)
router.post("/auth/register", registerUser)
router.post("/auth/login", registerUser)
router.put("/:id",updateUser)
router.delete("/:id", deleteUser)


module.exports = router;