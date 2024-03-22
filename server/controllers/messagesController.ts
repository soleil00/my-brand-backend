import { Request, Response } from "express";
import * as messageService from "../services/message.service"

export const userSendMessage = async (req:Request, res:Response) => {
    try {
        const response = messageService.sendMessage(req,res)

        return response

    } catch (error:any) {
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
}



export const getAllMessages = async (req: Request, res: Response) => {

    try {
        const response = await messageService.getAllMessages(req,res)

        return response

    } catch (error) {
        
    }
}

export const deleteMessage = async (req: Request, res: Response) => {

    try {
        const response = await messageService.deleteMessage(req, res)
        
        return response

    } catch (error:any) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        })
    }
    
}