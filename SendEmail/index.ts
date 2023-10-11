import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as nodemailer from "nodemailer";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { name, email, subject, subjectType, message, deviceInfo } = req.body;

    // Beautify JSON string
    const deviceInfoFormatted = JSON.stringify(deviceInfo, null, 4); // Indent with 4 spaces

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env["FromEmail"],
            pass: process.env["FromPassword"],
        },
    });

    // Use HTML for email content
    let mailOptions = {
        from: process.env["FromEmail"],
        to: process.env["ToEmail"],
        subject: subject,
        replyTo: email,
        html: `
        <p><strong>Subject Type:</strong> ${subjectType}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <h2>Device Info:</h2>
        <pre>${deviceInfoFormatted}</pre>`, // Use <pre> for preformatted text display
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
