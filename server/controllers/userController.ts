import { Request, Response } from "express";
import * as userService from "../services/userServices"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers()
        if (users.length > 0) {
            const userCount = await userService.getUsersCount()
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
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req)
        return res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
    
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getSingleUser(req.params.id);
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
      
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUser(req.params.id)
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
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUser(req)
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
    
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}

