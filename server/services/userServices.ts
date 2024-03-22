
import { Request,Response } from "express";
import User, { UserDocument } from "../model/userMode";


export const getAllUsers = async () => {
    try {
        // const users = await User.find();
        const users = await User.find({username:{$exists: true}});
        return users
    } catch (error:any) {
        throw new Error(`Error happened while fetching all users: ${error.message}`);
    }
}

export const getUsersCount = async () => {
    try {
        const count = await User.countDocuments({username:{$exists: true}});
        return count
    } catch (error:any) {
        throw new Error(`Error happened while getting user counts ${error.message}`)
    }
}

export const createUser = async (req: Request) => { 
    try {
        const user = await User.create(req.body);
        return user
    } catch (error:any) {
        throw new Error(`Error while creating user ${error.message}`)
    }

}

export const updateUser = async (req: Request) => { 
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return user
    } catch (error:any) {
        throw new Error(`Error while updating user ---> ${error.message}`)
    }
}

export const deleteUser = async (id:string) => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user
    } catch (error:any) {
        throw new Error(`Error while deleting user ---> ${error.message}`)
    }
}

export const getSingleUser = async (req:Request,res:Response) => {
    try {
        const user = await User.findById(req.params.id);
        if(user){

            res.status(200).json({
                status: 200,
                message: "User found",
                data: user
            })
        } else {
            res.status(404).json({
                message: "User not found",
                status: 404
            })
        }
    } catch (error:any) {
        throw new Error(`Error while getting single user ---> ${error.message}`)
    }
}



export const loginUser = async (req: Request) => {
    const {email,password} = req.body
    try {
        const user :any = await User.findOne({$or:[{email},{username:email}]});

        if (!user) {
            throw new Error("User not found");
            
        }


        return user
       
    } catch (error:any) {
        console.log(`${error.message}`)
        return 
    }
}