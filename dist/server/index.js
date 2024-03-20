"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const databaseConnection_1 = __importDefault(require("./config/databaseConnection"));
const swaggerOptions_1 = __importDefault(require("./doc/swaggerOptions"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("API is working properly");
});
app.use("/api/v1", routes_1.default);
app.use("/api/v1/docs", swaggerOptions_1.default);
(0, databaseConnection_1.default)().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Connected to MongoDB");
    });
}).catch((error) => {
    console.log(`failed to connect to db with error : ${error.message}`);
});
exports.default = app;
