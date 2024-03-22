import { Request, Response } from "express";
import * as userService from "../services/userServices"
import * as jwtService from "../services/jwtServices.service"
import User from "../model/userMode";

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

        const emailExist = await User.findOne({ email: req.body.email });

        if (emailExist) {
            return res.status(400).json({
                status: 400,
                message: "Email already exists"
            });
        }
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
        const response = await userService.getSingleUser(req,res);

        return response
        
    } catch (error:any) {
      
        return res.status(500).json({
            message: "Internal server error",
            error:"sorry"
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


export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.loginUser(req)
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isPasswordMatch = user.password === req.body.password
        
       
        
        if (user && isPasswordMatch) {
            const token = jwtService.generateUserToken(user)

            return res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            data: user,
            token: token
        });
        } else {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }
    
        
    } catch (error:any) {
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}

