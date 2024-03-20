import mongoose from "mongoose";


const dbConnection = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error:any) {
        console.log(`failed to connect to DB : ${error.message}`)
        return mongoose.disconnect()
    }
}

export default dbConnection;