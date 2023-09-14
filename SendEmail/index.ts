import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as nodemailer from "nodemailer"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { name, email, message, deviceInfo } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env["FromEmail"],
            pass: process.env["FromPassword"],
        },
    });

    let mailOptions = {
        from: process.env["FromEmail"],
        to: process.env["ToEmail"],
        subject: 'Contact Us Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nDevice Info: ${JSON.stringify(deviceInfo)}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        context.res = {
            status: 200,
            body: "Email sent!",
        };
    } catch (error: any) {
        context.res = {
            status: 500,
            body: "Error sending email: " + error.toString(),
        };
    }
};

export default httpTrigger;
