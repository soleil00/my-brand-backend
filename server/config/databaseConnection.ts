import mongoose from "mongoose";
import log from "../utils/logger";


const dbConnection = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        log.info("Connected to MongoDB")
    } catch (error:any) {
        log.error("Could not connect to db");
        process.exit(1);
    }
}

export default dbConnection;