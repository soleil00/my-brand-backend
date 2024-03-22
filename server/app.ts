import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import appRoutes from "./routes";
import dbConnection from "./config/databaseConnection";
import docRouter from "./doc/swaggerOptions";
import cors from "cors"

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is working properly 🥰");
});

app.use("/api/v1", appRoutes);
app.use("/api/v1/docs", docRouter)

dbConnection()

export default app;
