import nodemailer from 'nodemailer';


export const sendEmailToUser = async (email: string, username: string) => {

    const transporter = nodemailer.createTransport({
        //@ts-ignore
       host: process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL, 
            pass: process.env.SMTP_PASS 
        }
   })

    const mailOptions  = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject:"APPRECIATIONS 🎉",
        html:`<!DOCTYPE html>
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
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        // console.log('Message sent: %s', info.response);
    } catch (error) {
        
    }

}


export default sendEmailToUser;
// module.exports = {sendEmailToUser}