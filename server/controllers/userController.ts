import { Request, Response } from "express";
import User from "../model/userMode";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({username:{$exists: true}},{password:0});
        if (users.length > 0) {
            const userCount = await User.countDocuments();
            return res.status(200).json({
                count: userCount,
                status: 200,
                message: "Users fetched successfully",
                data: users
            });
        }
        return res.status(404).json({
            message: "No users found"
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "User found",
                data: user
            });
        }
        return res.status(404).json({
            message: "User not found"
        });
    } catch (error:any) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "User deleted successfully",
                data: user
            });
        }
        return res.status(404).json({
            message: "User not found"
        });
    } catch (error:any) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "User updated successfully",
                data: user
            });
        }
        return res.status(404).json({
            message: "User not found"
        });
    } catch (error:any) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}

