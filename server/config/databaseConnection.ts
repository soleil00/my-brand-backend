import mongoose from "mongoose";
import log from "../utils/logger";
import dotenv from "dotenv"

dotenv.config()


const dbConnection = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://soleil00:soleil00@cluster0.isil1x3.mongodb.net/mybrandDB?retryWrites=true&w=majority&appName=Cluster0`)
        log.info("Connected to MongoDB")
    } catch (error:any) {
        log.error("Could not connect to db");
        log.error(error.message)
        process.exit(1);
    }
}

export default dbConnection;