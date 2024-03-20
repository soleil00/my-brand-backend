import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import appRoutes from "./routes";
import dbConnection from "./config/databaseConnection";
import docRouter from "./doc/swaggerOptions";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is working properly");
});

app.use("/api/v1", appRoutes);
app.use("/api/v1/docs", docRouter)

dbConnection().then(()=>{
  app.listen(process.env.PORT || 3000, () => {
    console.log("Connected to MongoDB");
  })
}).catch((error:any)=>{
  console.log(`failed to connect to db with error : ${error.message}`)
})



export default app;
