import { Request, Response } from "express"
import Message, { MessageDocument } from "../model/messageModel"
import Subscriber from "../model/subscribersModel"
import sendEmailToUser from "./email.service"


export const sendMessage = async (req: Request,res:Response) => {
    
    try {
        const newMessage = await Message.create({
            ...req.body
        })

        if (req.body.subscribed) {
            const newSub = await Subscriber.create({
                email: req.body.email,
                name: req.body.name
            })

            await sendEmailToUser(req.body.email, req.body.name)
        }

        return res.status(200).json({
            status: 200,
            message: "Message sent successfully",
            data: newMessage
        })

    } catch (error:any) {
        console.log(`Error: ${error.message}`)

        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const getMessageCount = async () => {
    try {
        const messageCount:number = await Message.countDocuments();
        return messageCount;
    } catch (error:any) {
        console.log(`Error: ${error.messsage}`)
    }
}

export const getAllMessages = async (req:Request,res:Response) => {
    
    try {
        const allMessages: MessageDocument[] = await Message.find()
        const count = allMessages.length;

        if (count > 0) { 
            return res.status(200).json({
                status: 200,
                message: "All message retived",
                count: count,
                data: allMessages
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "No message found"
            })
        }

    } catch (error:any) {
        res.send(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const getMessageById = async (req: any) => {

    const {id} = req.params
    
    try {
        const singleMessage = await Message.findById(id)

        if (singleMessage) {

            return singleMessage

        } else {

            throw new Error("Message not found")

            return
        }

    } catch (error:any) {
        console.log(`Error getting message ${error.message}`)
        return
    }

}


export const deleteMessage = async (req: Request,res:Response) => {

    try {
        const messageToDelete = await Message.findById(req.params.id)
        
        if (messageToDelete) {

            await Message.findByIdAndDelete(req.params.id)

            return res.status(200).json({
                status: 200,
                message: "Message deleted successfully 🍭"
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: "Message not found 🔬"
            })
        }
    } catch (error:any) {
        console.log(`Error deleting message ${error.message}`)
        return
    }
}