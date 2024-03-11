import express, { Request, Response } from "express"
import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import blogRoutes from "./routes/blogRoutes"

dotenv.config()


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

const userRoutes = require("./routes/userRoutes")


app.get("/", (req:Request, res:Response) => {
    res.send("api is working properly")
})

app.use("/api/users", userRoutes)
app.use("/api/blogs",blogRoutes)



mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000} and connected to MongoDB on ${process.env.MONGODB_URL}`)
    })

})