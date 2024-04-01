import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import appRoutes from "../routes";
import docRouter from "../doc/swaggerOptions";
import cors from "cors";

dotenv.config();

const createServer = () => {
    const app = express();

    // Use middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(bodyParser.json());

    // Allow CORS for all routes
    app.use(cors());

    // Custom CORS headers
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    // Define routes
    app.get("/", (req: Request, res: Response) => {
        res.send("API is working properly 🥰");
    });

    app.use("/api/v1", appRoutes);
    app.use("/api/v1/docs", docRouter);

    // Handle preflight OPTIONS requests
    app.options("*", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.sendStatus(200);
    });

    return app;
}

export default createServer;
