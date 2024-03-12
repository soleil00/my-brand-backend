import express, { Request, Response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import appRoutes from "./routes"

dotenv.config()


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

app.get("/", (req:Request, res:Response) => {
    res.send("api is working properly")
})

app.use("/api/v1",appRoutes)



mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000} and connected to MongoDB on ${process.env.MONGODB_URL}`)
    })

})