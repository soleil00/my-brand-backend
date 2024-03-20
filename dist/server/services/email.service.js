"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToUser = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmailToUser = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        //@ts-ignore
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }
    });
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "APPRECIATIONS 🎉",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
        }
        h2 {
            color: #333;
        }
        p {
            color: #666;
            margin-bottom: 20px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Thank You for Subscribing, ${username}!</h2>
        <p>We're thrilled to have you on board. You'll now receive our latest updates, news, and promotions straight to your inbox.</p>
        <p>Stay tuned!</p>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="mailto:srukundo02@gmail.com">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
`
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.response);
    }
    catch (error) {
    }
});
exports.sendEmailToUser = sendEmailToUser;
exports.default = exports.sendEmailToUser;
// module.exports = {sendEmailToUser}
