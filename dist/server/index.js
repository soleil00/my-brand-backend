"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("API is working properly");
});
app.use("/api/v1", routes_1.default);
mongoose_1.default.connect(`${process.env.MONGODB_URL}`).then(() => {
    console.log("Connected to MongoDB");
});
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running`);
});
// afterAll(async () => {
//   await mongoose.connection.close();
//   server.close();
// });
exports.default = app;
