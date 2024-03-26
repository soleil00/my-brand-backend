import { Request, Response } from "express";
import Subscriber, { SubscribersDocument } from "../model/subscribersModel";


export const getAllSubscribers = async (req:Request, res:Response) => {
    
    try {

        const allSubs: SubscribersDocument[] = await Subscriber.find()
        
        const count = allSubs.length

        if (count > 0) {
            return res.status(200).json({
                status: 200,
                message: "Subscribers fetched successfully",
                count: count,
                data: allSubs
            })
        } else {
            return res.status(404).json({
                message: "No subscribers found 😢"
            })
        }
        
    } catch (error:any) {
        console.log(`Error: ${error.message}`)

        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}


export const deleteSubscriber = async (req: Request, res: Response) => {
    
    const { id } = req.params
    
    try {
        const subToDelete = await Subscriber.findById(id)

        if (subToDelete) {
            await Subscriber.findByIdAndDelete(id)

            return res.status(200).json({
                status: 200,
                message: "Subscriber deleted successfully"
            })
            
        } else {
            return res.status(404).json({
                message: "Subscriber not found 😢"
            })
        }
    } catch (error:any) {
        console.log(`error ${error.message}`)
    }
}